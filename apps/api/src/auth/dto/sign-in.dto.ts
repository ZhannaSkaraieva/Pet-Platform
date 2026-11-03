import { Transform } from 'class-transformer';
import { normalizeEmail } from '../../users/dto/normalize-email.js';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @Transform(normalizeEmail)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}
