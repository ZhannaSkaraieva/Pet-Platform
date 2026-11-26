import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PetsService } from './pets.service.js';
import { CreatePetDto } from './dto/create-pet.dto.js';
import { UpdatePetDto } from './dto/update-pet.dto.js';
import { ResponsePetDto } from './dto/response-pet.dto.js';
import { CurrentUser } from '@nestjs/authentication';
import { UserResponseDto } from '../users/dto/user-response.dto.js';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  async createNewPet(
    @Body() dto: CreatePetDto,
    @CurrentUser() owner: UserResponseDto,
  ): Promise<ResponsePetDto> {
    return await this.petsService.createNewPet(dto, owner.id);
  }

  @Get()
  async findAllPets(
    @CurrentUser() owner: UserResponseDto,
  ): Promise<ResponsePetDto[]> {
    const pets = await this.petsService.findAllPets(owner.id);
    return pets.map((pet) => new ResponsePetDto(pet));
  }

  @Get(':id')
  async findOnePetById(
    @Param('id') id: string,
    @CurrentUser() owner: UserResponseDto,
  ): Promise<ResponsePetDto> {
    return await this.petsService.findOnePetById(id, owner.id);
  }

  @Patch(':id')
  async updatePet(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
    @CurrentUser() owner: UserResponseDto,
  ): Promise<ResponsePetDto> {
    return await this.petsService.updatePet(id, updatePetDto, owner.id);
  }

  @Delete(':id')
  async removePet(
    @Param('id') id: string,
    @CurrentUser() owner: UserResponseDto,
  ): Promise<ResponsePetDto> {
    return await this.petsService.removePet(id, owner.id);
  }
}
