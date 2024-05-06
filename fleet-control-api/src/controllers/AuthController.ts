import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MagicLoginStrategy } from 'src/auth/MagicLoginStrategy';
import { AuthService } from 'src/services/AuthService';

//TODO paginar os motoristas

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private strategy: MagicLoginStrategy,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Req() req, @Res() res, @Body() body) {
    console.log(body);
    const user = await this.authService.validateUser(body.destination);
    if (!user) {
      throw new NotFoundException('Usuario não encontrado em nossa base!');
    }
    return this.strategy.send(req, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  async logOut(@Res({ passthrough: true }) res) {
    res.clearCookie('auth');
    return { url: 'http://localhost:5173/sign-up' };
  }

  @UseGuards(AuthGuard('magiclogin'))
  @Redirect('http://localhost:5173/', 302)
  @Get('/login/callback')
  callback(@Req() req, @Res({ passthrough: true }) res) {
    const acessToken = this.authService.generateToken(req.user);
    res.cookie('auth', acessToken, { httpOnly: false });
    return { url: 'http://localhost:5173/' };
  }
}
