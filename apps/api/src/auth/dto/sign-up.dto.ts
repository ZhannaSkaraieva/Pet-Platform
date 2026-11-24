import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { normalizeEmailString } from '../../users/dto/normalize-email.js';

export class SignUpDto {
  @IsNotEmpty({ message: 'Please Enter your Email' })
  @IsEmail({}, { message: 'Please Enter a Valid Email' })
  @Transform(({ value }) => {
    return typeof value === 'string' ? normalizeEmailString(value) : value;
  })
  email: string;
  @IsString()
  @MaxLength(128, {
    message: 'Password Length Must Be Max 128 Charcters',
  })
  @MinLength(8, {
    message: 'Password Length Must Be Min 8 Charcters',
  })
  @IsNotEmpty({ message: 'Please Enter your Password' })
  password: string;
}
