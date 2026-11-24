import { Test, TestingModule } from '@nestjs/testing';
import { MedicalhistoryService } from './medicalhistory.service.js';

describe('MedicalhistoryService', () => {
  let service: MedicalhistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalhistoryService],
    }).compile();

    service = module.get<MedicalhistoryService>(MedicalhistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
