import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalhistoryDto } from './create-medicalhistory.dto.js';

export class UpdateMedicalhistoryDto extends PartialType(CreateMedicalhistoryDto) {}
