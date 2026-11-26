import { Injectable, NotFoundException } from '@nestjs/common';
import { PetsDataService } from './pets.data-service.js';
import { CreatePet, ResponsePet } from './entities/pet.entity.js';
import { UpdatePetDto } from './dto/update-pet.dto.js';

@Injectable()
export class PetsService {
  constructor(private readonly petsDataService: PetsDataService) {}

  async createNewPet(
    petType: CreatePet,
    ownerId: string,
  ): Promise<ResponsePet> {
    return await this.petsDataService.createNewPet({ ...petType, ownerId });
  }

  async findAllPets(ownerId: string): Promise<ResponsePet[]> {
    return await this.petsDataService.findAllPets(ownerId);
  }

  async findOnePetById(id: string, ownerId: string): Promise<ResponsePet> {
    const pet = await this.petsDataService.findOnePetById(id, ownerId);
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet;
  }

  async updatePet(
    id: string,
    updatePetDto: UpdatePetDto,
    ownerId: string,
  ): Promise<ResponsePet> {
    const pet = await this.petsDataService.findOnePetById(id, ownerId);
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    const updatePet = await this.petsDataService.updatePet(
      id,
      updatePetDto,
      ownerId,
    );
    return updatePet;
  }

  async removePet(id: string, ownerId: string): Promise<ResponsePet> {
    const pet = await this.petsDataService.removePet(id, ownerId);
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet;
  }
}
