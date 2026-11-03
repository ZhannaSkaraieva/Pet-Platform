import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module.js';
import { EmailVerificationController } from './email-verification.controller.js';
import { EmailVerificationMailer } from './email-verification.mailer.js';

@Module({
  imports: [UsersModule],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationMailer],
})
export class EmailVerificationModule {}
