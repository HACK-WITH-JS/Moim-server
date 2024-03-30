import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { TechstackModule } from 'src/techstack/techstack.module';
import { PositionModule } from 'src/position/position.module';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository],
  imports: [TechstackModule, PositionModule],
})
export class PostModule {}
