import { UserRepository } from 'src/user/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { randomUUID } from 'crypto';
import { Profile, Strategy } from 'passport-github2';
import { PositionRepository } from 'src/position/position.repository';
import { DEFAULT_CARREER } from 'src/constant/carreer.constant';
import { DEFAULT_POSITION_NAME } from 'src/constant/position.constant';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
    private positionRepository: PositionRepository,
    @Inject(ConfigService) configService: ConfigService,
  ) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'), // TODO 상수 분리 예정
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get('GITHUB_REDIRECT_URI'),
      scope: ['public_profile'],
    });
  }

  // OAuth 인증이 끝나고 콜백으로 실행되는 메서드
  async validate(_: string, __: string, profile: Profile) {
    const { provider, username } = profile;
    const providerId = provider;
    const signupRequired = false;

    let user = await this.userRepository.findOneByEmail(
      `${username}@github.com`,
    );

    const defaultPosition = await this.positionRepository.findOneByName(
      DEFAULT_POSITION_NAME,
    );

    if (!user) {
      user = await this.userRepository.create(
        `${username}@github.com`, // TODO 이게 유니크한 값이니까.. 개선 필요할수도
        randomUUID(),
        randomUUID(),
        providerId,
        DEFAULT_CARREER,
        defaultPosition,
      );
    }

    return { ...user, signupRequired };
  }
}
