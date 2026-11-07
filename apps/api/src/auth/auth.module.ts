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
import { jwtConstants } from './constants.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { APP_GUARD } from '@nestjs/core/constants.js';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController, PasswordResetController, OidcController],
  providers: [
    AuthService,
    AuthDataService,
    PasswordResetMailer,
    AccountLinker,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
