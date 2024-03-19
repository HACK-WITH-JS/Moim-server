import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaIndecator } from './prisma.indicator';
import { TransactionService } from './transaction.service';

@Global()
@Module({
  providers: [TransactionService, PrismaService, PrismaIndecator],
  exports: [TransactionService, PrismaService, PrismaIndecator],
})
export class PrismaModule {}
