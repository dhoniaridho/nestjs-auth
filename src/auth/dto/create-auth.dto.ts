import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
