import { Injectable } from '@nestjs/common';
import { TechStack, UserTechStack } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTxType } from 'src/prisma/prisma.type';

@Injectable()
export class UserTechStackRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllByIncludeTechStack(userId: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).userTechStack.findMany({
      where: {
        userId,
      },
      include: {
        techStack: true,
      },
    });
  }

  deleteAllBy(
    deleteTechStacks: UserTechStack[],
    id: number,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).userTechStack.deleteMany({
      where: {
        userId: id,
        techStack: {
          id: {
            in: deleteTechStacks.map((techStack) => techStack.techStackId),
          },
        },
      },
    });
  }

  createManyWith(addTechStacks: TechStack[], id: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).userTechStack.createMany({
      data: addTechStacks.map((techStack) => ({
        userId: id,
        techStackId: techStack.id,
      })),
    });
  }
}
