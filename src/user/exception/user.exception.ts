import { BadRequestException } from '@nestjs/common';

export class DuplicatedNickNameException extends BadRequestException {
  constructor(nickName: string) {
    super(`Duplicated nickName: ${nickName}`);
  }
}

export class UserNotFoundException extends BadRequestException {
  constructor(email: string) {
    super(`User not found with email: ${email}`);
  }
}
