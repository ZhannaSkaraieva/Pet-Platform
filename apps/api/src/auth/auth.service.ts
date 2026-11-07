import { PasswordHasher } from '@nestjs/authentication';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisteredUser, SignIn, SignUp } from './interface/auth.interface.js';
import { AuthDataService } from './auth.data-service.js';
import { JwtService } from '@nestjs/jwt';

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
      passwordHash: hashedPassword,
      isVerified: false,
    });
    return {
      id: user.id,
      email: user.email,
      isVerified: user.isVerified,
    };
  }

  /** The user, or `null` when the email or the password is wrong. */
  async verify(signIn: SignIn): Promise<RegisteredUser | null> {
    const { email, password } = signIn;
    const found = await this.authDataService.findByEmail(email);
    // With no account (or no password), verify() checks a dummy hash, so the
    // response time does not reveal which emails are registered.
    const valid = await this.passwordHasher.verify(
      password,
      found?.passwordHash,
    );
    if (!valid || !found?.passwordHash) {
      return null;
    }
    // The cost settings changed since this hash was stored: upgrade it now,
    // while we have the plaintext.
    if (this.passwordHasher.needsRehash(found.passwordHash)) {
      await this.authDataService.updatePasswordHash(
        found.id,
        await this.passwordHasher.hash(password),
      );
    }
    return { id: found.id, email: found.email, isVerified: found.isVerified };
  }

  async signIn(user: RegisteredUser): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
