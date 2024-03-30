import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { CreatePostRequestDto } from './dto/post.req.dto';
import { Request } from 'express';
import { PostService } from './post.service';

@Controller('/api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(
    @Body() createRequest: CreatePostRequestDto,
    @Req() req: Request,
  ) {
    return await this.postService.createPost(createRequest, req.user.id);
  }

  @Delete('/:postId')
  async deletePost(@Req() req: Request, @Param('postId') postId: number) {
    return await this.postService.deletePost(req.user.id, postId);
  }
}
