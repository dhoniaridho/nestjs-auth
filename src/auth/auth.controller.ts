import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    const cridential = await this.authService.validateUser(
      createAuthDto.email,
      createAuthDto.password,
    );
    return {
      data: cridential,
    };
  }
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    const user = await this.userService.findOne(req.user.userId);
    if (!user) throw new UnauthorizedException();
    const profile = user.toJSON();
    delete profile.password;
    return profile;
  }
}
