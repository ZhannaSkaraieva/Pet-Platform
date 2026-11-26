import { Gender } from '../../generated/prisma/browser.js';

export interface CreatePet {
  name: string;
  photo_url?: string | null;
  gender: Gender;
  breed: string;
  date_of_birth: Date;
  description?: string | null;
}

export interface PetsCreateInput extends CreatePet {
  ownerId: string;
}
export interface UpdatePet {
  name?: string;
  photo_url?: string | null;
  gender?: Gender;
  breed?: string;
  date_of_birth?: Date;
  description?: string | null;
}

export interface ResponsePet {
  id: string;
  name: string;
  photo_url?: string | null;
  gender: Gender;
  breed: string;
  date_of_birth: Date;
  description?: string | null;
  ownerId: string;
}
