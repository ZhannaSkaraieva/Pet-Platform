import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { Prisma, User } from '../generated/prisma/client.js';

@Injectable()
export class UsersDataService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findAll(data: Prisma.UserFindManyArgs): Promise<User[]> {
    return await this.prisma.user.findMany(data);
  }

  async findOne(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: data,
    });
  }

  async delete(id: string): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
