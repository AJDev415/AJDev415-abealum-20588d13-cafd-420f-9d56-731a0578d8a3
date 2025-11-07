
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  // Here is where the authentication process continues on the server side
  // The username is used to find the user in the database
  // The provided password is compared with the stored hashed password using bcrypt
  // If the passwords match, a JWT is created and returned along with user details
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string, role: string, organization: string }> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user?.password.trim() || '');

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      role: user.role,
      organization: user.org,
    };
  }
}
