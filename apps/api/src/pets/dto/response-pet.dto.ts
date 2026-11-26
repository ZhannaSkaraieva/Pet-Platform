import { ResponsePet } from '../entities/pet.entity.js';

export class ResponsePetDto {
  id: string;
  name: string;
  photo_url?: string | null;
  gender: Gender;
  breed: string;
  date_of_birth: Date;
  description?: string | null;
  ownerId: string;
  constructor(pet: ResponsePet) {
    this.id = pet.id;
    this.name = pet.name;
    this.photo_url = pet.photo_url;
    this.gender = pet.gender;
    this.breed = pet.breed;
    this.date_of_birth = pet.date_of_birth;
    this.description = pet.description;
    this.ownerId = pet.ownerId;
  }
}
