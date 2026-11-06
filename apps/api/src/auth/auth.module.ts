import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module.js';
import { SessionAuth } from './session-auth.provider.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { AuthDataService } from './auth.data-service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PasswordResetMailer } from './password-reset.mailer.js';
import { PasswordResetController } from './password-reset.controller.js';
import { OidcController } from './oidc.controller.js';
import { AccountLinker } from './account-linker.js';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [AuthController, PasswordResetController, OidcController],
  providers: [
    SessionAuth,
    AuthService,
    AuthDataService,
    PasswordResetMailer,
    PasswordResetMailer,
    AccountLinker,
  ],
})
export class AuthModule {}
