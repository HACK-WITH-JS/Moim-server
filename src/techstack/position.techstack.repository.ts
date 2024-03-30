import { Injectable } from '@nestjs/common';
import { TechStack } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTxType } from 'src/prisma/prisma.type';

@Injectable()
export class PostTechStackRepository {
  constructor(private readonly prisma: PrismaService) {}

  createManyWith(techStacks: TechStack[], postId: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).postTechStack.createMany({
      data: techStacks.map((techStack) => ({
        postId,
        techStackId: techStack.id,
      })),
    });
  }

  findAllByNames(techStackNames: string[], tx?: PrismaTxType) {
    return (tx ?? this.prisma).techStack.findMany({
      where: {
        name: {
          in: techStackNames,
        },
      },
    });
  }
}
