import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './guards/google.auth.guard';
import { AuthService } from './auth.service';
import { GithubAuthGuard } from './guards/github.auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './decorator/auth.decorator';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/google')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('/google/callback')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = await this.authService.login(req.user.id);

    res
      .status(200)
      .cookie('accessToken', accessToken, {
        httpOnly: false, // TODO 나중에 다시 보기 true로 변경
        path: '/',
        sameSite: 'lax',
      })
      .redirect('http://localhost:3000/auth/login/redirect');
  }

  @Get('/github')
  @Public()
  @UseGuards(GithubAuthGuard)
  async githubAuth() {}

  @Get('/github/callback')
  @Public()
  @UseGuards(GithubAuthGuard)
  async githubAuthCallback(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = await this.authService.login(req.user.id);

    res
      .status(200)
      .cookie('accessToken', accessToken, {
        httpOnly: false, // TODO 나중에 다시 보기 true로 변경
        path: '/',
        sameSite: 'lax',
      })
      .redirect('http://localhost:3000/auth/login/redirect');
  }
}
