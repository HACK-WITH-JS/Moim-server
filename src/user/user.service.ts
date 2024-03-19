import { Injectable } from '@nestjs/common';
import { UpdateUserRequestDto } from './dto/user.req.dto';
import { UserRepository } from './user.repository';
import {
  UserNotFoundException,
  DuplicatedNickNameException,
} from './exception/user.exception';
import { LinkRepository } from 'src/link/link.reposiotry';
import { TechStackRepository } from 'src/techstack/techstack.repository';
import { UserTechStackRepository } from 'src/techstack/user.techstack.repository';
import { InvalidTechStackException } from 'src/techstack/exception/techstack.exception';
import {
  DeleteUserResponseDto,
  GetMyInfoResponseDto,
  UpdateUserResponseDto,
} from './dto/user.res.dto';
import { UpdateUserInfo } from './user.type';
import { PositionRepository } from 'src/position/position.repository';
import { PositionNotFoundException } from 'src/position/position.exception';
import { TransactionService } from 'src/prisma/transaction.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private linkRepository: LinkRepository,
    private techStackRepository: TechStackRepository,
    private userTechStackRepository: UserTechStackRepository,
    private postionRepository: PositionRepository,
    private transactionService: TransactionService,
  ) {}

  async getMyInfo(userId: number) {
    const user =
      await this.userRepository.findOneByUserIdWithTechStackAndLinkAndPosition(
        userId,
      );

    const techStacks = await this.techStackRepository.findAllByTechStackIds(
      user.techStacks.map((stack) => stack.techStackId),
    );

    return GetMyInfoResponseDto.of(
      user.email,
      user.nickName,
      user.profileImageUrl,
      user.position.name,
      user.positionOpenStatus,
      user.carrer,
      user.introduce,
      techStacks.map((stack) => stack.name),
      user.links,
    );
  }

  // TODO Transaction다른 파일로 분리 하고 싶은데 나중에 하기 prismaService.$transactio만 노출 시켜주면 됨!
  // 트랜잭션 참고 자료 https://www.prisma.io/docs/orm/prisma-client/queries/transactions#bulk-operations
  async updateUser(updateUserRequest: UpdateUserRequestDto) {
    const { email, nickName, links, stacks, position } = updateUserRequest;
    const user = await this.userRepository.findOneByEmailWithPosition(email);

    if (user == null) {
      throw new UserNotFoundException(email);
    }

    // 닉네임 변경 시도시 중복 체크
    if (user.nickName !== nickName) {
      const existsByNickName =
        await this.userRepository.existsByNickName(nickName);

      if (existsByNickName) {
        throw new DuplicatedNickNameException(nickName);
      }
    }

    // Link 바뀌었는지 검사.
    const findedLinks = await this.linkRepository.findAllByEmail(email);
    const [deleteLinks, addLinks] = this.updateLinks(
      links.map((link) => link.url),
      findedLinks.map((link) => link.url),
    );

    //  Stack 바뀌었는지 검사
    const findedTechStacks = await this.techStackRepository.findAll(stacks);
    const findedUserTechStacks =
      await this.userTechStackRepository.findAllByIncludeTechStack(user.id);

    // TechStack은 어드민만 추가 삭제 할 수 있기 때문에 findedTechStack에 없으면 예외 처리
    if (findedTechStacks.length !== stacks.length) {
      throw new InvalidTechStackException(stacks);
    }

    const [deleteTechStacks, addTechStacks] = this.updateUserTechStacks(
      stacks,
      findedUserTechStacks.map((stack) => stack.techStack.name),
    );

    // Position이 바뀌었는지 검사
    if (user.position.name !== position) {
      const updatedPosition =
        await this.postionRepository.findOneByName(position);

      if (updatedPosition == null) {
        throw new PositionNotFoundException(position);
      }

      user.positionId = updatedPosition.id;
    }

    // Transaction으로 묶기
    this.transactionService.transaction(async (tx) => {
      await this.userRepository.updateUser(
        UpdateUserInfo.of(
          user.email,
          user.nickName,
          user.profileImageUrl,
          user.positionOpenStatus,
          user.carrer,
          user.introduce,
          user.password,
          user.providerId,
          user.positionId,
          user.createdAt,
        ),
        user.id,
        tx,
      );

      await this.linkRepository.deleteAll(deleteLinks, user.id, tx);
      await this.linkRepository.addAll(
        links.filter((link) => addLinks.includes(link.url)),
        user.id,
        tx,
      );

      await this.userTechStackRepository.deleteAllBy(
        findedUserTechStacks.filter((userTechStack) =>
          deleteTechStacks.includes(userTechStack.techStack.name),
        ),
        user.id,
        tx,
      );
      await this.userTechStackRepository.createManyWith(
        findedTechStacks.filter((techStack) =>
          addTechStacks.includes(techStack.name),
        ),
        user.id,
        tx,
      );
    });

    return UpdateUserResponseDto.of(
      email,
      nickName,
      user.profileImageUrl,
      position,
      user.positionOpenStatus,
      user.carrer,
      user.introduce,
      stacks,
      links,
    );
  }

  // findedLink에는 존재하지만 links에는 없는 경우 findedLink 삭제
  // findedLink에는 존재하지 않지만 links에는 있는 경우 links 추가
  private updateLinks(requestLinks: string[], findedLinks: string[]) {
    const deleteLinks = findedLinks.filter(
      (findedLink) => !requestLinks.includes(findedLink),
    );

    const addLinks = requestLinks.filter(
      (requestLink) => !findedLinks.includes(requestLink),
    );

    return [deleteLinks, addLinks];
  }

  // findedUserTechStack에는 존재하지만 stacks에는 없는 경우 findedUserTechStack 삭제
  // findedUserTechStack에는 존재하지 않지만 stacks에는 있는 경우 stacks 추가
  private updateUserTechStacks(
    requestTechStacks: string[],
    findedTechStacks: string[],
  ) {
    const deleteTechStacks = findedTechStacks.filter(
      (findedTechStack) => !requestTechStacks.includes(findedTechStack),
    );

    const addTechStacks = requestTechStacks.filter(
      (requestTechStack) => !findedTechStacks.includes(requestTechStack),
    );

    return [deleteTechStacks, addTechStacks];
  }

  async deleteUser(userId: number) {
    const deletedUser = await this.userRepository.deleteOneById(userId);
    return DeleteUserResponseDto.of(deletedUser.email, deletedUser.nickName);
  }
}
