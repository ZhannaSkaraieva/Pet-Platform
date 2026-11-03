import { Injectable } from '@nestjs/common';
import {
  AuthenticationRegistry,
  SessionCookieProvider,
  type SessionRecord,
} from '@nestjs/authentication';
import { AuthDataService } from './auth.data-service.js';
import { RegisteredDto } from './dto/registered.dto.js';

@Injectable()
export class SessionAuth extends SessionCookieProvider<RegisteredDto> {
  constructor(
    private readonly authDataService: AuthDataService,
    registry: AuthenticationRegistry,
  ) {
    super();
    // Adds this provider to the chain the guard runs for every request.
    registry.registerProvider(this);
  }

  // Called for every request with a live session cookie.
  // Returning null (the user was deleted) ends the session.
  async validate(session: SessionRecord): Promise<RegisteredDto | null> {
    const user = await this.authDataService.findOne(session.userId);
    if (!user) {
      return null;
    }
    return { id: user.id, email: user.email, isVerified: user.isVerified };
  }
}
