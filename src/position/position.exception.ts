import { BadRequestException } from '@nestjs/common';

export class PositionNotFoundException extends BadRequestException {
  constructor(name: string) {
    super(`Position with name ${name} not found.`);
  }
}
