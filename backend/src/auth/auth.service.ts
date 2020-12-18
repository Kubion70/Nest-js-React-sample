import { Injectable } from '@nestjs/common';
import { UsersService } from '../models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/users/users.entity';
import { CryptoHelper } from '../common/helpers/crypto.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    if (!username) return null;

    const user = await this.usersService.getUserByUsername(username);
    const hashedPass = CryptoHelper.sha256(pass);
    if (!user || user.password !== hashedPass) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
