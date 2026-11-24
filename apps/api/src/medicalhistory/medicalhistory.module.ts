import { Module } from '@nestjs/common';
import { MedicalhistoryService } from './medicalhistory.service.js';
import { MedicalhistoryController } from './medicalhistory.controller.js';

@Module({
  controllers: [MedicalhistoryController],
  providers: [MedicalhistoryService],
})
export class MedicalhistoryModule {}
