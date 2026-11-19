import { PasswordHasher } from '@nestjs/authentication';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisteredUser, SignIn, SignUp } from './interface/auth.interface.js';
import { AuthDataService } from './auth.data-service.js';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from '../users/interface/user.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly authDataService: AuthDataService,
    private readonly passwordHasher: PasswordHasher,
    private jwtService: JwtService,
  ) {}

  async signUp(singUp: SignUp): Promise<RegisteredUser> {
    const { email, password } = singUp;
    const existingUser = await this.authDataService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await this.passwordHasher.hash(password);
    const user = await this.authDataService.createUser({
      email,
      password: hashedPassword,
      isVerified: false,
    });
    return {
      id: user.id,
      email: user.email,
      isVerified: user.isVerified,
    };
  }

  /** The user, or `null` when the email or the password is wrong. */
  async signIn(signIn: SignIn): Promise<{ access_token: string }> {
    const { email, password } = signIn;
    const found = await this.authDataService.findByEmail(email);
    // With no account (or no password), verify() checks a dummy hash, so the
    // response time does not reveal which emails are registered.
    const valid = await this.passwordHasher.verify(password, found?.password);
    if (!valid || !found?.password) {
      throw new UnauthorizedException();
    }
    // The cost settings changed since this hash was stored: upgrade it now,
    // while we have the plaintext.
    if (this.passwordHasher.needsRehash(found.password)) {
      await this.updatePasswordHash(
        found.id,
        await this.passwordHasher.hash(password),
      );
    }
    const payload = { email: found.email, sub: found.id };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  // Runs when the link is used. It verifies nothing if the address changed since.
  async markVerified(userId: string, email: string) {
    return await this.authDataService.markEmailVerified(userId, email);
  }

  async findForPasswordReset(email: string) {
    const user = await this.authDataService.findByEmail(email);
    return user?.password
      ? { id: user.id, email: user.email, password: user.password }
      : null;
  }

  async findByIdentity(
    provider: string,
    subject: string,
  ): Promise<UserResponse | null> {
    const user = await this.authDataService.findByIdentity(provider, subject);
    return (
      user && { id: user.id, email: user.email, isVerified: user.isVerified }
    );
  }
  async createVerifiedUser(email: string): Promise<RegisteredUser> {
    const user = await this.authDataService.createUser({
      email,
      isVerified: true,
    });
    return { id: user.id, email: user.email, isVerified: user.isVerified };
  }

  async linkIdentity(
    userId: string,
    provider: string,
    subject: string,
  ): Promise<RegisteredUser | null> {
    await this.authDataService.linkIdentity(userId, provider, subject);
    return this.authDataService.findById(userId);
  }

  async updatePasswordHash(id: string, passwordHash: string): Promise<void> {
    await this.authDataService.updatePasswordHash(id, passwordHash);
  }

  async findByEmail(email: string): Promise<RegisteredUser | null> {
    const user = await this.authDataService.findByEmail(email);
    return (
      user && { id: user.id, email: user.email, isVerified: user.isVerified }
    );
  }
}
