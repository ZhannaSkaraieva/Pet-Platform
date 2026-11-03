import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { normalizeEmail } from '../../users/dto/normalize-email.js';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(normalizeEmail)
  email: string;
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
