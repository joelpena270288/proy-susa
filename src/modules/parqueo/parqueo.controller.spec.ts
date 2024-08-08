import { Test, TestingModule } from '@nestjs/testing';
import { ParqueoController } from './parqueo.controller';
import { ParqueoService } from './parqueo.service';

describe('ParqueoController', () => {
  let controller: ParqueoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParqueoController],
      providers: [ParqueoService],
    }).compile();

    controller = module.get<ParqueoController>(ParqueoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
