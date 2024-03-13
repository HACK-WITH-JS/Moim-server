import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateAccessToken(userId: number) {
    const payload = { sub: userId };
    return this.jwtService.signAsync(payload);
  }

  // TODO 나중에 refresh token을 만들어야 할 때 사용
  async generateRefreshToken(user: Express.User) {
    const payload = { sub: user.id };

    // TODO get에 있는 key 값 분리 필요.
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('AUTH_CONSTANT.JWT_SECRET'),
      expiresIn: this.configService.get('AUTH_CONSTANT.REFRESH_TOKEN_EXPIRE'),
    });
  }

  async decodeToken(token: string) {
    return this.jwtService.decode<{ sub: number }>(token);
  }
}
