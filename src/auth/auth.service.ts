import { Injectable } from '@nestjs/common';
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

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(1);
    if (user) {
      const passwordValid = await bcrypt.compare(pass, user.password);
      if(passwordValid){
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOne(1);
    if (user) {console.log(user)
      const passwordValid = await bcrypt.compare(loginDto.password, user.password);console.log(passwordValid)
      if(passwordValid){
        const payload = { username: loginDto.username, sub: loginDto.password };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
    return null    
  }
}
