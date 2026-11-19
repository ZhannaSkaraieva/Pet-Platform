import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { normalizeEmailString } from '../../users/dto/normalize-email.js';

export class EmailDto {
  @Transform(({ value }) => {
    return typeof value === 'string' ? normalizeEmailString(value) : value;
  })
  @IsEmail()
  email: string;
}
