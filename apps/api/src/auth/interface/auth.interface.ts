export interface SignUp {
  email: string;
  password: string;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface RegisteredUser {
  id: string;
  email: string;
  isVerified: boolean;
}
