import { RegisteredUser } from '../interface/auth.interface.js';

export class RegisteredDto {
  id: string;
  email: string;
  isVerified: boolean;

  constructor(registeredUser: RegisteredUser) {
    this.id = registeredUser.id;
    this.email = registeredUser.email;
    this.isVerified = registeredUser.isVerified;
  }
}
