import { Injectable } from '@nestjs/common';
import { Position } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTxType } from 'src/prisma/prisma.type';

@Injectable()
export class PostPositionRepository {
  constructor(private readonly prisma: PrismaService) {}

  createManyWith(positions: Position[], postId: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).postPosition.createMany({
      data: positions.map((position) => ({
        postId,
        positionId: position.id,
      })),
    });
  }
}
