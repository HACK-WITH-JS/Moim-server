import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTxType } from 'src/prisma/prisma.type';

@Injectable()
export class TechStackRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(techStackNames: string[], tx?: PrismaTxType) {
    return (tx ?? this.prisma).techStack.findMany({
      where: {
        name: {
          in: techStackNames,
        },
      },
    });
  }
}
