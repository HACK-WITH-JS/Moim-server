import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PositionModule } from './position/position.module';
import { PrismaModule } from './prisma/prisma.module';
import { S3Module } from './s3/s3.module';
import { HealthModule } from './health/health.module';
import { LinkModule } from './link/link.module';
import { TechstackModule } from './techstack/techstack.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PositionModule,
    PrismaModule,
    S3Module,
    HealthModule,
    LinkModule,
    TechstackModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
