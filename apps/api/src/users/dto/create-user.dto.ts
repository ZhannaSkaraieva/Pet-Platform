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

export class CreateUserDto {
  @IsOptional()
  @IsEmail()
  public readonly email: string | null;

  @IsOptional()
  @MinLength(8)
  public readonly password: string;

  @IsOptional()
  @IsString()
  public readonly phone: string | null;

  @IsOptional()
  @IsEnum(UserRole)
  public readonly role: UserRole;

  @IsOptional()
  @IsString()
  public readonly firstName: string;

  @IsOptional()
  @IsString()
  public readonly lastName: string;

  @IsOptional()
  @IsString()
  public readonly avatarUrl: string;

  @IsBoolean()
  public readonly isVerified: boolean;
}
