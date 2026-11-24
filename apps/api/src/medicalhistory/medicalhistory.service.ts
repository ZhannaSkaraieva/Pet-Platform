import { Injectable } from '@nestjs/common';
import { CreateMedicalhistoryDto } from './dto/create-medicalhistory.dto.js';
import { UpdateMedicalhistoryDto } from './dto/update-medicalhistory.dto.js';

@Injectable()
export class MedicalhistoryService {
  create(createMedicalhistoryDto: CreateMedicalhistoryDto) {
    return 'This action adds a new medicalhistory';
  }

  findAll() {
    return `This action returns all medicalhistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalhistory`;
  }

  update(id: number, updateMedicalhistoryDto: UpdateMedicalhistoryDto) {
    return `This action updates a #${id} medicalhistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalhistory`;
  }
}
