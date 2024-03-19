import { Injectable } from '@nestjs/common';
import { Link } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTxType } from 'src/prisma/prisma.type';

@Injectable()
export class LinkRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllByEmail(email: string, tx?: PrismaTxType) {
    return (tx ?? this.prisma).link.findMany({
      where: {
        user: {
          email,
        },
      },
    });
  }

  deleteAll(urls: string[], userId: number, tx?: PrismaTxType) {
    return (tx ?? this.prisma).link.deleteMany({
      where: {
        userId,
        url: {
          in: urls,
        },
      },
    });
  }

  addAll(
    links: Pick<Link, 'url' | 'description'>[],
    userId: number,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prisma).link.createMany({
      data: links.map((link) => ({
        url: link.url,
        description: link.description,
        userId,
      })),
    });
  }
}
