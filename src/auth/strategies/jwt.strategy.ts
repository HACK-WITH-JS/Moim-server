import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { TokenPayload } from '../../types/auth.type';
import { ConfigService } from '@nestjs/config';
import { AUTH_CONSTANTS } from 'src/constant/auth.constant';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(ConfigService) configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.accessToken;
        },
      ]),
      ignoreExpiration: false, // passport에서 토큰 알아서 검증하는 설정
      secretOrKey: configService.get(AUTH_CONSTANTS.JWT_SECRET),
    });
  }

  async validate(payload: TokenPayload) {
    return { id: payload.sub };
  }
}
