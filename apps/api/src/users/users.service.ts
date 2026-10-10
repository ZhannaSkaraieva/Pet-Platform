import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { FindUsersDto } from './dto/find-user.dto.js';
import { UsersDataService } from './user.data-service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly usersDataService: UsersDataService) {}

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    if (!dto.email && !dto.phone) {
      throw new BadRequestException('Either email or phone is required');
    }
    const data: Prisma.UserCreateInput = {
      email: dto.email || null,
      password: dto.password || null,
      phone: dto.phone,
      role: dto.role,
      firstName: dto.firstName,
      lastName: dto.lastName,
      avatarUrl: dto.avatarUrl,
      isVerified: dto.isVerified,
    };
    try {
      const user = await this.usersDataService.createUser(data);
      return user as UserResponseDto;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'User with this email or phone already exists',
        );
      }

      throw error;
    }
  }

  async findAll(dto: FindUsersDto): Promise<UserResponseDto[]> {
    try {
      return (await this.usersDataService.findAll({
        where: {
          email: dto.email,
          phone: dto.phone,
          role: dto.role,
          firstName: dto.firstName,
          lastName: dto.lastName,
          avatarUrl: dto.avatarUrl,
          isVerified: dto.isVerified,
        },
      })) as UserResponseDto[];
    } catch (error) {
      throw new NotFoundException('Error finding users');
    }
  }

  async findOne(id: string): Promise<UserResponseDto | null> {
    try {
      const user = await this.usersDataService.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user as UserResponseDto;
    } catch (error) {
      throw new NotFoundException('Error finding user');
    }
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.usersDataService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersDataService.update(id, dto);
  }

  async deleteUser(id: string): Promise<UserResponseDto> {
    const user = await this.usersDataService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersDataService.delete(id);
  }
}
