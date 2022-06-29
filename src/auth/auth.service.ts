import { UsersService } from './../users/users.service';
import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async signup(userName: string, userPassword: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.usersService.insertUser(userName, hashedPassword);
    return {
      msg: 'User successfully registered',
      userId: result.id,
      userName: result.username,
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('Invalid user credentials');
    }
    if (user && passwordValid) {
      return {
        userId: user.id,
        userName: user.username,
      };
    }
    return null;
  }
}
