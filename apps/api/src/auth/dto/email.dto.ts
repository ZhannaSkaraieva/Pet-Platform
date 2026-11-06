import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { normalizeEmail } from '../../users/dto/normalize-email.js';

export class EmailDto {
  @Transform(normalizeEmail)
  @IsEmail()
  email: string;
}
