import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UsersDataService } from './user.data-service.js';
import type {
  FindUsers,
  UserCreate,
  UserResponse,
  UserUpdate,
} from './interface/user.interface.js';
import { PasswordHasher } from '@nestjs/authentication';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersDataService: UsersDataService,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async createUser(userCreate: UserCreate): Promise<UserResponse> {
    const { email, password } = userCreate;
    if (!email) {
      throw new BadRequestException('The email is required');
    }
    const passwordHashed = await this.passwordHasher.hash(password);
    const newUser = await this.usersDataService.createUser({
      email: email,
      passwordHash: passwordHashed,
      isVerified: false, // New users are unverified by default);
    });
    return {
      id: newUser.id,
      email: newUser.email,
      isVerified: newUser.isVerified,
    };
  }

  async findAllUsers(findUsers: FindUsers): Promise<UserResponse[]> {
    const { id, email, isVerified } = findUsers;

    const users = await this.usersDataService.findAll({
      where: {
        id: id,
        email: email,
        isVerified: isVerified,
      },
    });
    if (!users || users.length === 0) {
      throw new BadRequestException('No users found');
    }
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      isVerified: user.isVerified,
    }));
  }

  async findOne(id?: string, email?: string) {
    if (!id && !email) {
      throw new BadRequestException('Id or email is required');
    }
    try {
      return await this.usersDataService.findOne(id, email);
    } catch {
      throw new Error('Error fetching users');
    }
  }

  async findById(id: string): Promise<UserResponse | null> {
    const user = await this.usersDataService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { id: user.id, email: user.email, isVerified: user.isVerified };
  }

  async findByEmail(email: string): Promise<UserResponse | null> {
    const user = await this.usersDataService.findOne(undefined, email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { id: user.id, email: user.email, isVerified: user.isVerified };
  }

  async updateUser(id: string, userUpdate: UserUpdate): Promise<UserResponse> {
    const user = await this.usersDataService.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const updatedUser = await this.usersDataService.update(id, userUpdate);
    return {
      id: updatedUser.id,
      email: updatedUser.email,
      isVerified: updatedUser.isVerified,
    };
  }

  async deleteUser(id: string): Promise<UserResponse> {
    const user = await this.usersDataService.findOne(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const deletedUser = await this.usersDataService.delete(id);
    return {
      id: deletedUser.id,
      email: deletedUser.email,
      isVerified: deletedUser.isVerified,
    };
  }

  async updatePasswordHash(id: string, passwordHash: string): Promise<void> {
    await this.usersDataService.updatePasswordHash(id, passwordHash);
  }

  // Runs when the link is used. It verifies nothing if the address changed since.
  markVerified(userId: string, email: string) {
    return this.usersDataService.markEmailVerified(userId, email);
  }

  async findForPasswordReset(email: string) {
    const user = await this.usersDataService.findOne(undefined, email);
    return user?.passwordHash
      ? { id: user.id, email: user.email, passwordHash: user.passwordHash }
      : null;
  }

  async findByIdentity(
    provider: string,
    subject: string,
  ): Promise<UserResponse | null> {
    const user = await this.usersDataService.findByIdentity(provider, subject);
    return (
      user && { id: user.id, email: user.email, isVerified: user.isVerified }
    );
  }
  async createVerifiedUser(email: string): Promise<UserResponse> {
    const user = await this.usersDataService.createUser({
      email,
      isVerified: true,
    });
    return { id: user.id, email: user.email, isVerified: user.isVerified };
  }

  async linkIdentity(
    userId: string,
    provider: string,
    subject: string,
  ): Promise<UserResponse | null> {
    await this.usersDataService.linkIdentity(userId, provider, subject);
    return this.findById(userId);
  }
}
