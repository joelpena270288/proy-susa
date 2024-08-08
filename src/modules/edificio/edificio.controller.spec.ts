import { Test, TestingModule } from '@nestjs/testing';
import { EdificioController } from './edificio.controller';
import { EdificioService } from './edificio.service';

describe('EdificioController', () => {
  let controller: EdificioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EdificioController],
      providers: [EdificioService],
    }).compile();

    controller = module.get<EdificioController>(EdificioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
