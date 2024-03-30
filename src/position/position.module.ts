import { Module } from '@nestjs/common';
import { PositionRepository } from './position.repository';
import { PostPositionRepository } from './post.position.repository';

@Module({
  providers: [PositionRepository, PostPositionRepository],
  exports: [PositionRepository, PostPositionRepository],
})
export class PositionModule {}
