import { Injectable } from '@nestjs/common';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(private tokenService: TokenService) {}

  async login(userId: number) {
    const accessToken = await this.tokenService.generateAccessToken(userId);
    return { accessToken };
  }
}
