import { Module } from '@nestjs/common';
import { TechStackRepository } from './techstack.repository';
import { UserTechStackRepository } from './user.techstack.repository';
import { PostTechStackRepository } from './position.techstack.repository';

@Module({
  providers: [
    TechStackRepository,
    UserTechStackRepository,
    PostTechStackRepository,
  ],
  exports: [
    TechStackRepository,
    UserTechStackRepository,
    PostTechStackRepository,
  ],
})
export class TechstackModule {}
