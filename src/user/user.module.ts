import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { LinkModule } from 'src/link/link.module';
import { TechstackModule } from 'src/techstack/techstack.module';
import { PositionModule } from 'src/position/position.module';

@Module({
  imports: [LinkModule, TechstackModule, PositionModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
