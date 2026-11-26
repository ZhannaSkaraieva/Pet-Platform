import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Pets } from '../generated/prisma/client.js';
import { PetsCreateInput } from './entities/pet.entity.js';
import { UpdatePetDto } from './dto/update-pet.dto.js';

@Injectable()
export class PetsDataService {
  constructor(private readonly prisma: PrismaService) {}

  async createNewPet(data: PetsCreateInput): Promise<Pets> {
    return await this.prisma.pets.create({
      data: {
        name: data.name,
        photo_url: data.photo_url,
        gender: data.gender,
        breed: data.breed,
        date_of_birth: data.date_of_birth,
        description: data.description,
        owner: {
          connect: {
            id: data.ownerId,
          },
        },
      },
    });
  }

  async findAllPets(ownerId: string): Promise<Pets[]> {
    return await this.prisma.pets.findMany({
      where: {
        ownerId: ownerId,
      },
    });
  }

  async findOnePetById(id: string, ownerId: string): Promise<Pets | null> {
    return await this.prisma.pets.findUnique({
      where: {
        ownerId: ownerId,
        id: id,
      },
    });
  }

  async updatePet(
    id: string,
    updatePetDto: UpdatePetDto,
    ownerId: string,
  ): Promise<Pets> {
    return await this.prisma.pets.update({
      where: { id, ownerId },
      data: updatePetDto,
    });
  }

  async removePet(id: string, ownerId: string): Promise<Pets> {
    return await this.prisma.pets.delete({ where: { id, ownerId } });
  }
}
