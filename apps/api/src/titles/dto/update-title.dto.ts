import { PartialType } from '@nestjs/mapped-types';
import { CreateTitleDto } from './create-title.dto.js';

export class UpdateTitleDto extends PartialType(CreateTitleDto) {}
