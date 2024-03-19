import { Injectable } from '@nestjs/common';
import { Position } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTxType } from 'src/prisma/prisma.type';
import { UpdateUserInfo } from './user.type';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOneByEmail(email: string, tx?: PrismaTxType) {
    return (tx ?? this.prisma).user.findUnique({
      where: {
        email,
      },
    });
  }

  findOneByEmailWithPosition(email: string, tx?: PrismaTxType) {
    return (tx ?? this.prisma).user.findUnique({
      where: {
        email,
      },
      include: {
        position: true,
      },
    });
  }

  async existsByNickName(nickName: string, tx?: PrismaTxType) {
    const user = await (tx ?? this.prisma).user.findUnique({
      where: {
        nickName,
      },
    });

    return user != null;
  }

  create(
    email: string,
    nickName: string,
    password: string,
    providerId: string,
    carrer: number,
    position: Position,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).user.create({
      data: {
        email,
        nickName,
        password,
        providerId,
        carrer,
        position: {
          connect: { id: position.id },
        },
      },
    });
  }

  updateUser(user: UpdateUserInfo, userId: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).user.update({
      where: {
        id: userId,
      },
      data: user,
    });
  }
}
