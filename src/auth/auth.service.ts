import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByUsername(loginDto.username);
    if (user) {
      const passwordValid = await bcrypt.compare(loginDto.password, user.password);
      if(passwordValid){
        const payload = { username: user.username, id: user.id };
        return {
          accessToken: this.jwtService.sign(payload),
        };
      }
    }
    throw new UnauthorizedException();
  }
}
