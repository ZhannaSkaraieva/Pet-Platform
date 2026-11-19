import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  UnauthorizedException,
} from '@nestjs/common';
import {
  EmailVerificationService,
  CurrentUser,
  PasswordResetService,
  OidcService,
  Public as AuthPublic,
} from '@nestjs/authentication';
import { SignUpDto } from './dto/sign-up.dto.js';
import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { RegisteredDto } from './dto/registered.dto.js';
import { VerifyTokenDto } from './dto/verify-token.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
import { EmailDto } from './dto/email.dto.js';
import { Public } from './guard/public.decorator.js';

//POST /auth/sign-up,POST /auth/sign-in
//POST /auth/email/verify,POST /auth/email/verification
//GET /auth/oidc/google/login,GET /auth/oidc/google/callback
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authservice: AuthService,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly passwordResetService: PasswordResetService,
    private readonly oidcService: OidcService,
  ) {}

  @AuthPublic()
  @Public()
  @Post('sign-up')
  @HttpCode(202)
  async signUp(@Body() body: SignUpDto) {
    const user = await this.authservice.signUp(body);
    // The link in this email proves the customer owns the address.
    const result = await this.emailVerificationService.send(user);
    return {
      message: 'Verification email sent',
      email: user.email,
      expiresAt: result.expiresAt,
    };
  }

  @AuthPublic()
  @Public()
  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() body: SignInDto) {
    const user = await this.authservice.signIn(body);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }

  // Called by the page the link opens, which POSTs the token from its URL.
  // must be public because the user is not signed in yet
  @AuthPublic()
  @Public()
  @Post('email/verify')
  @HttpCode(200)
  async verify(@Body() dto: VerifyTokenDto) {
    const verified = await this.emailVerificationService.verify(dto.token);
    if (!verified) {
      throw new BadRequestException('Invalid or expired link');
    }
    return { email: verified.email, isVerified: true };
  }

  // "Send the link again", to the signed-in customer's current address.

  @Post('email/verification')
  @HttpCode(202)
  async resend(@CurrentUser() user: RegisteredDto) {
    if (user.isVerified) {
      throw new ConflictException('Email address already verified');
    }
    await this.emailVerificationService.send(user);
  }

  @Public()
  @AuthPublic()
  @Post('password/forgot')
  @HttpCode(202)
  forgot(@Body() body: EmailDto) {
    this.passwordResetService.request(body.email);
  }

  // Called by the page the link opens, with the token from its URL and the new password.
  @Public()
  @AuthPublic()
  @Post('password/reset')
  @HttpCode(200)
  async reset(@Body() body: ResetPasswordDto) {
    const result = await this.passwordResetService.reset(
      body.token,
      body.password,
    );
    if (!result) {
      throw new BadRequestException('Invalid or expired link');
    }
    return { success: true };
  }

  // "Sign in with Google" links here. With ?link=true, "Connect Google"
  // links the Google account to the signed-in customer instead.
  @Public()
  @Public()
  @Get('oidc/:provider/login')
  @Redirect()
  login(
    @Param('provider') provider: string,
    @Query('redirectTo') redirectTo?: string,
    @Query('link') link?: string,
  ) {
    return this.oidcService.start(provider, {
      redirectTo,
      link: link === 'true',
    });
  }

  // Where Google sends the browser back.
  @Public()
  @AuthPublic()
  @Get('oidc/:provider/callback')
  @Redirect()
  callback(
    @Param('provider') provider: string,
    @Query() query: Record<string, string>,
  ) {
    return this.oidcService.finish(provider, query);
  }
}
