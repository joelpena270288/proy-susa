import { Test, TestingModule } from '@nestjs/testing';
import { CisternaController } from './cisterna.controller';
import { CisternaService } from './cisterna.service';

describe('CisternaController', () => {
  let controller: CisternaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CisternaController],
      providers: [CisternaService],
    }).compile();

    controller = module.get<CisternaController>(CisternaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
