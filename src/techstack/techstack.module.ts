import { Module } from '@nestjs/common';
import { TechStackRepository } from './techstack.repository';
import { UserTechStackRepository } from './user.techstack.repository';

@Module({
  providers: [TechStackRepository, UserTechStackRepository],
  exports: [TechStackRepository, UserTechStackRepository],
})
export class TechstackModule {}
