import { Body, Controller, Put } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UpdateUserResponseDto } from './dto/user.res.dto';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { UpdateUserRequestDto } from './dto/user.req.dto';
import { HttpResponseDto } from 'src/common/dto/res.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiExtraModels(UpdateUserResponseDto)
@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiPostResponse(UpdateUserResponseDto)
  @Put()
  async updateUser(@Body() updateUserRequest: UpdateUserRequestDto) {
    // TODO 로그인한 사용자의 이메일이 updateUserRequest.email과 같은지 확인
    const ret = await this.userService.updateUser(updateUserRequest);
    return new HttpResponseDto(true, ret, null);
  }
}
