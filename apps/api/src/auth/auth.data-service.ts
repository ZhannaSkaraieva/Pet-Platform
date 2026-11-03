import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma, User } from '../generated/prisma/client.js';

@Injectable()
export class AuthDataService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('User with this email already exists');
      }

      throw error;
    }
  }

  async findOne(id?: string, email?: string): Promise<User | null> {
    if (id) {
      return await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    }
    if (email) {
      return await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    }
    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    if (email) {
      return await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    }
    return null;
  }

  async updatePasswordHash(id: string, passwordHash: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: { passwordHash },
    });
  }
}
