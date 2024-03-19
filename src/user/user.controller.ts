import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { ApiCookieAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { GetMyInfo, UpdateUserResponseDto } from './dto/user.res.dto';
import {
  ApiGetResponse,
  ApiPostResponse,
} from 'src/common/decorator/swagger.decorator';
import { UpdateUserRequestDto } from './dto/user.req.dto';
import { HttpResponseDto } from 'src/common/dto/res.dto';
import { UserService } from './user.service';
import { Request } from 'express';

@ApiTags('User')
@ApiExtraModels(UpdateUserResponseDto, GetMyInfo)
@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  @ApiCookieAuth()
  @ApiGetResponse(GetMyInfo)
  async getMyInfo(@Req() req: Request) {
    const ret = await this.userService.getMyInfo(req.user.id);
    return new HttpResponseDto(true, ret, null);
  }

  @Put()
  @ApiPostResponse(UpdateUserResponseDto)
  async updateUser(@Body() updateUserRequest: UpdateUserRequestDto) {
    // TODO 로그인한 사용자의 이메일이 updateUserRequest.email과 같은지 확인
    const ret = await this.userService.updateUser(updateUserRequest);
    return new HttpResponseDto(true, ret, null);
  }
}
