import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../generated/prisma/client.js';

export class FindUsersDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  avatarUrl: string;

  @IsBoolean()
  isVerified: boolean;
}
