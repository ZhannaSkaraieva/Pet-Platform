import { Test, TestingModule } from '@nestjs/testing';
import { MedicalhistoryController } from './medicalhistory.controller.js';
import { MedicalhistoryService } from './medicalhistory.service.js';

describe('MedicalhistoryController', () => {
  let controller: MedicalhistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalhistoryController],
      providers: [MedicalhistoryService],
    }).compile();

    controller = module.get<MedicalhistoryController>(MedicalhistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
