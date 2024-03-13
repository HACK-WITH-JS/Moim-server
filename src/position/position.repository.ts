import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
