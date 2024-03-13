import { Module } from '@nestjs/common';
import { PositionRepository } from './position.repository';

@Module({
  providers: [PositionRepository],
  exports: [PositionRepository],
})
export class PositionModule {}
