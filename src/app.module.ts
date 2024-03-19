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
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

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
  providers: [PrismaService, { provide: APP_GUARD, useClass: JwtAuthGuard }], // 모든 요청에 JWT Guard 적용
  exports: [PrismaService],
})
export class AppModule {}
