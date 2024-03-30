import { Injectable } from '@nestjs/common';
import { ContactMethod, MoimMethod, PostType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTxType } from 'src/prisma/prisma.type';
import { CreatePostRequestDto } from './dto/post.req.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  // title, content, postType, recruits, onOffStatus contactType contactMethod expectedPeriod  stacks positions
  createPostByUserId(
    post: CreatePostParams,
    authorId: number,
    tx?: PrismaTxType,
  ) {
    // TODO 현재 여기 코드는 런타임 에러가 발생할 가능성이 있음 입력 값에서 프리즈마 타입 검증을 안 했기 때문
    // 문제는 검증시 프리즈마 타입을 사용한다면 프레젠테이션 서비스 레이어에서 데이터 모양이 중구난방인데 구조적 타이핑을 어떻게 활용 할지 고민 후 전체 적인 리팩토링이 필요하다.
    return (tx ?? this.prisma).post.create({
      data: {
        title: post.title,
        content: post.content,
        type: post.postType as PostType, // TODO  Primsa Type을 서비스 레이어에서 어떻게 할 것인지 고민 필요
        status: 'OPEN',
        capacity: post.recruits,
        method: post.onOffStatus as MoimMethod,
        progressPeriod: new Date(post.expectedPeriod).toISOString(),
        contactMethod: post.contactType as ContactMethod,
        authorId,
      },
    });
  }

  findOneById(id: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).post.findUnique({
      where: {
        id,
      },
    });
  }

  deletePostById(postId: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).post.delete({
      where: {
        id: postId,
      },
    });
  }
}

type CreatePostParams = Pick<
  CreatePostRequestDto,
  | 'title'
  | 'content'
  | 'postType'
  | 'recruits'
  | 'onOffStatus'
  | 'contactType'
  | 'contactMethod'
  | 'expectedPeriod'
>;
