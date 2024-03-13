import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { randomUUID } from 'crypto';
import { UserRepository } from 'src/user/user.repository';
import { PositionRepository } from 'src/position/position.repository';

const DEFAULT_POSITION_NAME = 'NONE';
const DEFAULT_CARREER = 0;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
    private positionRepository: PositionRepository,
    @Inject(ConfigService) configService: ConfigService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_REDIRECT_URI'),
      scope: ['email', 'profile'],
    });
  }

  // OAuth 인증이 끝나고 콜백으로 실행되는 메서드
  async validate(_: string, __: string, profile: Profile) {
    const { id, emails } = profile;
    const providerId = id;
    const email = emails[0].value;
    let signupRequired = false;

    let user = await this.userRepository.findOneByEmail(email);
    const defaultPosition = await this.positionRepository.findOneByName(
      DEFAULT_POSITION_NAME,
    );
    //  사용자가 존재하지 않을 경우 새로운 사용자를 생성
    if (!user) {
      user = await this.userRepository.create(
        email,
        randomUUID(),
        randomUUID(),
        providerId,
        DEFAULT_CARREER,
        defaultPosition,
      );

      signupRequired = true;
    }

    return { ...user, signupRequired };
  }
}
