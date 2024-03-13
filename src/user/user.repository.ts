import { Injectable } from '@nestjs/common';
import { Position } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(
    email: string,
    nickName: string,
    password: string,
    providerId: string,
    carrer: number,
    position: Position,
  ) {
    return this.prisma.user.create({
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
}
