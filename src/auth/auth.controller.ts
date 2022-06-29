import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(
    @Body('password') userPassword: string,
    @Body('username') userName: string,
  ) {
    return this.authService.signup(userName, userPassword);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin() {
    return {
      message: 'User is logged in!',
    };
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('/user')
  getHello(@Req() req): string {
    return req.user;
  }

  //Get / logout
  @Get('/signout')
  logout(@Session() session): any {
    session.destroy();
    return { msg: 'The user session has ended' };
  }
}
