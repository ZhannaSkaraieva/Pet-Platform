import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Gender } from '../../generated/prisma/browser.js';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsOptional()
  photo_url: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsNotEmpty()
  @IsDate()
  date_of_birth: Date;

  @IsString()
  @IsOptional()
  description: string;
}
