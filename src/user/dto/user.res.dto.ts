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

export class GetMyInfo {
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
    const user = new GetMyInfo();
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
