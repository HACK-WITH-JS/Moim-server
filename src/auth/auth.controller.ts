import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './guards/google.auth.guard';
import { AuthService } from './auth.service';
import { GithubAuthGuard } from './guards/github.auth.guard';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  async googleAuth() {}

  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    // accessToken 생성
    const { accessToken } = await this.authService.login(req.user.id);
    // 로그인이 필요한 경우와 아닌 경우 존재
    if (req.user.signupRequired) {
      return res.redirect(
        `http://localhost:3000/auth/redirect?signup=true&accessToken=${accessToken}`,
      );
    }

    res.redirect(
      `http://localhost:3000/auth/redirect?signup=false&accessToken=${accessToken}`,
    );
  }

  @UseGuards(GithubAuthGuard)
  @Get('/github')
  async githubAuth() {}

  @UseGuards(GithubAuthGuard)
  @Get('/github/callback')
  async githubAuthCallback(@Req() req: Request, @Res() res: Response) {
    // accessToken 생성
    const { accessToken } = await this.authService.login(req.user.id);
    // 로그인이 필요한 경우와 아닌 경우 존재
    if (req.user.signupRequired) {
      return res.redirect(
        `http://localhost:3000/auth/redirect?signup=true&accessToken=${accessToken}`,
      );
    }

    res.redirect(
      `http://localhost:3000/auth/redirect?signup=false&accessToken=${accessToken}`,
    );
  }
}
