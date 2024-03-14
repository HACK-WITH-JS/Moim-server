import { Module } from '@nestjs/common';
import { S3Controller } from './s3.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { S3ConfigFactory } from 'src/config/s3.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: S3ConfigFactory,
    }),
  ],
  controllers: [S3Controller],
})
export class S3Module {}
