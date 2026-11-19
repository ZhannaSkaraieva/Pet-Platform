import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { normalizeEmailString } from '../../users/dto/normalize-email.js';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => {
    return typeof value === 'string' ? normalizeEmailString(value) : value;
  })
  email: string;
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
