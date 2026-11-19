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

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updatePasswordHash(id: string, passwordHash: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: { password: passwordHash },
    });
  }

  async markEmailVerified(id: string, email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user || user.email !== email) {
      return false;
    }
    await this.prisma.user.update({
      where: { id, email: email },
      data: { isVerified: true },
    });
    return true;
  }

  async findByIdentity(
    provider: string,
    subject: string,
  ): Promise<User | null> {
    const identity = await this.prisma.userIdentity.findUnique({
      where: {
        provider_subject: {
          provider,
          subject,
        },
      },
      include: { user: true },
    });
    return identity?.user ?? null;
  }

  async linkIdentity(
    id: string,
    provider: string,
    subject: string,
  ): Promise<void> {
    await this.prisma.userIdentity.create({
      data: {
        userId: id,
        provider,
        subject,
      },
    });
  }
}
