import { Body, Controller, Delete, Get, Put, Req } from '@nestjs/common';
import { ApiCookieAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  GetMyInfoResponseDto,
  UpdateUserResponseDto,
} from './dto/user.res.dto';
import {
  ApiGetResponse,
  ApiPostResponse,
} from 'src/common/decorator/swagger.decorator';
import { UpdateUserRequestDto } from './dto/user.req.dto';
import { HttpResponseDto } from 'src/common/dto/res.dto';
import { UserService } from './user.service';
import { Request } from 'express';

@ApiTags('User')
@ApiExtraModels(UpdateUserResponseDto, GetMyInfoResponseDto)
@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  @ApiCookieAuth()
  @ApiGetResponse(GetMyInfoResponseDto)
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

  @Delete()
  async deleteUser(@Req() req: Request) {
    const ret = await this.userService.deleteUser(req.user.id);
    return new HttpResponseDto(true, ret, null);
  }
}
