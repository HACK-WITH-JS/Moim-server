import { LinkInputDto } from './user.req.dto';

export class UpdateUserResponseDto {
  email: string;
  nickName: string;
  profileImageUrl: string;
  position: string;
  positionOpenStatus: string;
  career: number;
  introduction: string;
  stacks: string[];
  links: LinkInputDto[];

  static of(
    email: string,
    nickName: string,
    profileImageUrl: string,
    position: string,
    positionOpenStatus: string,
    career: number,
    introduction: string,
    stacks: string[],
    links: LinkInputDto[],
  ) {
    const user = new UpdateUserResponseDto();
    user.email = email;
    user.nickName = nickName;
    user.profileImageUrl = profileImageUrl;
    user.position = position;
    user.positionOpenStatus = positionOpenStatus;
    user.career = career;
    user.introduction = introduction;
    user.stacks = stacks;
    user.links = links;
    return user;
  }
}

export class GetMyInfoResponseDto {
  email: string;
  nickName: string;
  profileImageUrl: string;
  position: string;
  positionOpenStatus: string;
  career: number;
  introduction: string;
  stacks: string[];
  links: LinkInputDto[];

  static of(
    email: string,
    nickName: string,
    profileImageUrl: string,
    position: string,
    positionOpenStatus: string,
    career: number,
    introduction: string,
    stacks: string[],
    links: LinkInputDto[],
  ) {
    const user = new GetMyInfoResponseDto();
    user.email = email;
    user.nickName = nickName;
    user.profileImageUrl = profileImageUrl;
    user.position = position;
    user.positionOpenStatus = positionOpenStatus;
    user.career = career;
    user.introduction = introduction;
    user.stacks = stacks;
    user.links = links;
    return user;
  }
}

export class DeleteUserResponseDto {
  email: string;
  nickName: string;

  static of(email: string, nickName: string) {
    const user = new DeleteUserResponseDto();
    user.email = email;
    user.nickName = nickName;
    return user;
  }
}
