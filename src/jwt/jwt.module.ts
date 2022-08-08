import { JwtModule as JwtNestModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';
import config from 'src/config/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtNestModule.register({
      secret: config().jwt.secret,
      signOptions: {
        expiresIn: config().jwt.expires_in,
      },
    }),
  ],
  providers: [JwtStrategy, JwtAuthGuard, JwtService],
  exports: [JwtStrategy, JwtAuthGuard, JwtService],
})
export class JwtModule {}
