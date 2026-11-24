import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { CurrentUser } from '@nestjs/authentication';
import { RegisteredDto } from '../auth/dto/registered.dto.js';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('me')
  getMyProfile(@CurrentUser() user: RegisteredDto) {
    return this.profilesService.findProfileByUserId(user.id);
  }

  @Patch('me')
  editMyProfile(
    @CurrentUser() user: RegisteredDto,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.update(user.id, updateProfileDto);
  }
}
