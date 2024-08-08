import { Test, TestingModule } from '@nestjs/testing';
import { ParqueoService } from './parqueo.service';

describe('ParqueoService', () => {
  let service: ParqueoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParqueoService],
    }).compile();

    service = module.get<ParqueoService>(ParqueoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
