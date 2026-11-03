import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  EmailVerificationService,
  Public,
  SignInService,
} from '@nestjs/authentication';
import { SignUpDto } from './dto/sign-up.dto.js';
import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/sign-in.dto.js';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authservice: AuthService,
    private readonly signInService: SignInService,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Public()
  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    const user = await this.authservice.register(body);
    // The link in this email proves the customer owns the address.
    await this.emailVerificationService.send(user);
    return user;
  }

  @Public()
  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() body: SignInDto) {
    const user = await this.authservice.verify(body);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const { session } = await this.signInService.signIn(user.id, {
      method: 'password',
    });

    return { mfaRequired: session.mfa === 'pending' };
  }
}
