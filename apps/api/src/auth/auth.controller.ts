import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  EmailVerificationService,
  SignInService,
  Public as AuthPublic,
} from '@nestjs/authentication';
import { SignUpDto } from './dto/sign-up.dto.js';
import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { Public } from './public.decorator.js';

@AuthPublic()
@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authservice: AuthService,
    private readonly signInService: SignInService,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @AuthPublic()
  @Public()
  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    const user = await this.authservice.register(body);
    // The link in this email proves the customer owns the address.
    await this.emailVerificationService.send(user);
    return user;
  }

  @AuthPublic()
  @Public()
  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() body: SignInDto) {
    const user = await this.authservice.verify(body);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const result = await this.authservice.signIn(user);
    return result;
  }
}
