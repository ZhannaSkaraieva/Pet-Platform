import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalhistoryService } from './medicalhistory.service.js';
import { CreateMedicalhistoryDto } from './dto/create-medicalhistory.dto.js';
import { UpdateMedicalhistoryDto } from './dto/update-medicalhistory.dto.js';

@Controller('medicalhistory')
export class MedicalhistoryController {
  constructor(private readonly medicalhistoryService: MedicalhistoryService) {}

  @Post()
  create(@Body() createMedicalhistoryDto: CreateMedicalhistoryDto) {
    return this.medicalhistoryService.create(createMedicalhistoryDto);
  }

  @Get()
  findAll() {
    return this.medicalhistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalhistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalhistoryDto: UpdateMedicalhistoryDto) {
    return this.medicalhistoryService.update(+id, updateMedicalhistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalhistoryService.remove(+id);
  }
}
