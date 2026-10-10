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

export class UserResponseDto {
  @IsEmail()
  email: string | null;

  @IsOptional()
  @IsString()
  phone: string | null;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  firstName: string | null;

  @IsOptional()
  @IsString()
  lastName: string | null;

  @IsOptional()
  @IsString()
  avatarUrl: string | null;

  @IsBoolean()
  isVerified: boolean;
}
