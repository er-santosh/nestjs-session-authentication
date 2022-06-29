import { User } from './../users/user.model';
import { FacebookAuthGuard } from './guards/facebook.guard';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
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

  @Get('/facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@Req() req: any): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
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
