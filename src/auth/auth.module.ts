import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserModule } from 'src/user/user.module';
import { PositionModule } from 'src/position/position.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfigFactory } from 'src/config/jwt.config';
import { TokenService } from './token.service';

@Module({
  imports: [
    UserModule,
    PositionModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: JwtConfigFactory,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, GoogleStrategy],
})
export class AuthModule {}
