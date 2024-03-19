import { PositionOpenStatus } from '@prisma/client';

export class UpdateUserInfo {
  email: string;
  nickName: string;
  profileImageUrl: string;
  positionOpenStatus: PositionOpenStatus;
  carrer: number;
  introduce: string;
  password: string;
  providerId: string;
  positionId: number;
  createdAt: Date;

  // static 메소드를 이용하여 객체 생성
  static of(
    email: string,
    nickName: string,
    profileImageUrl: string,
    positionOpenStatus: PositionOpenStatus,
    carrer: number,
    introduce: string,
    password: string,
    providerId: string,
    positionId: number,
    createdAt: Date,
  ) {
    const user = new UpdateUserInfo();
    user.email = email;
    user.nickName = nickName;
    user.profileImageUrl = profileImageUrl;
    user.positionOpenStatus = positionOpenStatus;
    user.carrer = carrer;
    user.introduce = introduce;
    user.password = password;
    user.providerId = providerId;
    user.positionId = positionId;
    user.createdAt = createdAt;
    return user;
  }
}
