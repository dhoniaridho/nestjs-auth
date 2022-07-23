import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException();
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException();

    const profile = user.toJSON();
    delete profile.password;

    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload);
    return {
      user: profile,
      token: accessToken,
    };
  }
  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    delete user.password;
    return user;
  }
}
