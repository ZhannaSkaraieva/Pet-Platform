import { Transform } from 'class-transformer';
import { normalizeEmailString } from '../../users/dto/normalize-email.js';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @Transform(({ value }) => {
    return typeof value === 'string' ? normalizeEmailString(value) : value;
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  password: string;
}
