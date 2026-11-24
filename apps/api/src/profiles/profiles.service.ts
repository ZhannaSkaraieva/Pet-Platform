import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { Profile } from './entities/profile.entity.js';
import { ProfilesDataService } from './profiles.data-service.js';

@Injectable()
export class ProfilesService {
  constructor(private readonly profilesDataService: ProfilesDataService) {}

  async findProfileByUserId(userId: string): Promise<Profile> {
    const profile = await this.profilesDataService.findProfileByUserId(userId);
    if (!profile) {
      throw new Error(`Profile not found for userId: ${userId}`);
    }
    return profile;
  }

  async update(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.profilesDataService.findProfileByUserId(userId);
    if (!profile) {
      throw new Error(`Profile not found for userId: ${userId}`);
    }
    return this.profilesDataService.update(profile.id, updateProfileDto);
  }
}
