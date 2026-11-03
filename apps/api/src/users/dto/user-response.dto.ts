import { UserResponse } from '../interface/user.interface.js';

export class UserResponseDto {
  id: string;
  email: string;
  isVerified: boolean;

  constructor(user: UserResponse) {
    this.id = user.id;
    this.email = user.email;
    this.isVerified = user.isVerified;
  }
}
