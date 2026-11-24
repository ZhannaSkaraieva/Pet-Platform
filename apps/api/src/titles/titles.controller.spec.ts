import { Test, TestingModule } from '@nestjs/testing';
import { TitlesController } from './titles.controller.js';
import { TitlesService } from './titles.service.js';

describe('TitlesController', () => {
  let controller: TitlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TitlesController],
      providers: [TitlesService],
    }).compile();

    controller = module.get<TitlesController>(TitlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
