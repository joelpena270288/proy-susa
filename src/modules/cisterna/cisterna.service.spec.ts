import { Test, TestingModule } from '@nestjs/testing';
import { CisternaService } from './cisterna.service';

describe('CisternaService', () => {
  let service: CisternaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CisternaService],
    }).compile();

    service = module.get<CisternaService>(CisternaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
