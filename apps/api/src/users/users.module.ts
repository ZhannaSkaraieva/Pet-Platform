import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { UsersDataService } from './user.data-service.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, UsersDataService, PrismaService],
})
export class UsersModule {}
