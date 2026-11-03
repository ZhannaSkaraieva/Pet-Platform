export interface UserResponse {
  id: string;
  email: string;
  isVerified: boolean;
}

export interface UserCreate {
  email: string;
  password: string;
}

export interface UserUpdate {
  //isVerified?: boolean;
}

export interface FindUsers {
  id?: string;
  email?: string;
  isVerified?: boolean;
}
