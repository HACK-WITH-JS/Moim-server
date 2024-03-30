import { Injectable } from '@nestjs/common';
import { CreatePostRequestDto } from './dto/post.req.dto';
import { PostRepository } from './post.repository';
import { TransactionService } from 'src/prisma/transaction.service';
import { PostTechStackRepository } from 'src/techstack/position.techstack.repository';
import { PostPositionRepository } from 'src/position/post.position.repository';
import { PositionRepository } from 'src/position/position.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postTechStackRepository: PostTechStackRepository,
    private readonly postPositionRepository: PostPositionRepository,
    private readonly positionRepository: PositionRepository,
    private readonly transactionService: TransactionService,
  ) {}

  /**
   * 1. 테크 스택을 조회한다.
   * 2. 게시글을 생성한다.
   * 3. 게시글 테크 스택을 생성한다.
   * 4. 게시글 포지션을 생성한다.
   */
  async createPost(request: CreatePostRequestDto, userId: number) {
    const { stacks, positions } = request;

    const findedTechStacks =
      await this.postTechStackRepository.findAllByNames(stacks);
    const findedPositions =
      await this.positionRepository.findAllByNames(positions);

    return this.transactionService.transaction(async (tx) => {
      const createdPost = await this.postRepository.createPostByUserId(
        request,
        userId,
        tx,
      );

      await this.postTechStackRepository.createManyWith(
        findedTechStacks,
        createdPost.id,
        tx,
      );

      await this.postPositionRepository.createManyWith(
        findedPositions,
        createdPost.id,
        tx,
      );

      return this.postRepository.findOneById(createdPost.id, tx);
    });
  }
}
