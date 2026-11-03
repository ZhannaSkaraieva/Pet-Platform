import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module.js';
import { SessionAuth } from './session-auth.provider.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { AuthDataService } from './auth.data-service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [AuthController],
  providers: [SessionAuth, AuthService, AuthDataService],
})
export class AuthModule {}
