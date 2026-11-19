import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { normalizeEmailString } from './normalize-email.js';

export class CreateUserDto {
  @Transform(({ value }) => {
    return typeof value === 'string' ? normalizeEmailString(value) : value;
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
