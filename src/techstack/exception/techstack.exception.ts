import { BadRequestException } from '@nestjs/common';

export class InvalidTechStackException extends BadRequestException {
  constructor(teckStacks: string[]) {
    super(`Invalid tech stacks: ${teckStacks.join(', ')}`);
  }
}
