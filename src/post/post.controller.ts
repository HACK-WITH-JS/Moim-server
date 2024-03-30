import { Body, Controller, Post, Req } from '@nestjs/common';
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
    console.log(req.user);
    console.log(createRequest);
    return await this.postService.createPost(createRequest, req.user.id);
  }
}
