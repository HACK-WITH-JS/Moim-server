import { Module } from '@nestjs/common';
import { LinkRepository } from './link.reposiotry';

@Module({
  providers: [LinkRepository],
  exports: [LinkRepository],
})
export class LinkModule {}
