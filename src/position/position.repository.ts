import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTxType } from 'src/prisma/prisma.type';

@Injectable()
export class PositionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByName(name: string) {
    return this.prisma.position.findUnique({
      where: {
        name,
      },
    });
  }

  findAllByNames(positionNames: string[], tx?: PrismaTxType) {
    return (tx ?? this.prisma).position.findMany({
      where: {
        name: {
          in: positionNames,
        },
      },
    });
  }
}
