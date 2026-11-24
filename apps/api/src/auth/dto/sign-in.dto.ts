import { Transform } from 'class-transformer';
import { normalizeEmailString } from '../../users/dto/normalize-email.js';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @Transform(({ value }) => {
    return typeof value === 'string' ? normalizeEmailString(value) : value;
  })
  @IsNotEmpty({ message: 'Please Enter your Email' })
  @IsEmail({}, { message: 'Please Enter a Valid Email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Please Enter your Password' })
  @MaxLength(128)
  password: string;
}
