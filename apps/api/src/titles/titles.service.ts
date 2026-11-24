import { Injectable } from '@nestjs/common';
import { CreateTitleDto } from './dto/create-title.dto.js';
import { UpdateTitleDto } from './dto/update-title.dto.js';

@Injectable()
export class TitlesService {
  create(createTitleDto: CreateTitleDto) {
    return 'This action adds a new title';
  }

  findAll() {
    return `This action returns all titles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} title`;
  }

  update(id: number, updateTitleDto: UpdateTitleDto) {
    return `This action updates a #${id} title`;
  }

  remove(id: number) {
    return `This action removes a #${id} title`;
  }
}
