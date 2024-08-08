import { Test, TestingModule } from '@nestjs/testing';
import { PlantaTratamientoController } from './planta-tratamiento.controller';
import { PlantaTratamientoService } from './planta-tratamiento.service';

describe('PlantaTratamientoController', () => {
  let controller: PlantaTratamientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantaTratamientoController],
      providers: [PlantaTratamientoService],
    }).compile();

    controller = module.get<PlantaTratamientoController>(PlantaTratamientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
