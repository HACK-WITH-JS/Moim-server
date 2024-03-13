import { ConfigService } from '@nestjs/config';
import { AUTH_CONSTANTS } from 'src/constant/auth.constant';

export const JwtConfigFactory = async (configService: ConfigService) => {
  return {
    secret: configService.get(AUTH_CONSTANTS.JWT_SECRET),
    signOptions: {
      expiresIn: configService.get(AUTH_CONSTANTS.ACCESS_TOKEN_EXPIRE),
    },
  };
};
