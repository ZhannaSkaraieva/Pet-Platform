import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { AuthDataService } from './auth.data-service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PasswordResetMailer } from './reset-password/password-reset.mailer.js';
import { AccountLinker } from './providers/account-linker.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/jwt-auth.guard.js';
import { APP_GUARD } from '@nestjs/core';
import { EmailVerificationMailer } from './mail/email-verification.service.js';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthDataService,
    EmailVerificationMailer,
    PasswordResetMailer,
    AccountLinker,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
