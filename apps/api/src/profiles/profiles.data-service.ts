import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Profile } from './entities/profile.entity.js';

@Injectable()
export class ProfilesDataService {
  constructor(private readonly prisma: PrismaService) {}

  async findProfileByUserId(userId: string): Promise<Profile | null> {
    return await this.prisma.userProfile.findUnique({ where: { userId } });
  }

  async update(id: string, data: Partial<Profile>): Promise<Profile> {
    return await this.prisma.userProfile.update({ where: { id }, data });
  }
}
