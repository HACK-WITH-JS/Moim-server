import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaIndecator } from './prisma.indicator';

@Global()
@Module({
  providers: [PrismaService, PrismaIndecator],
  exports: [PrismaService, PrismaIndecator],
})
export class PrismaModule {}
