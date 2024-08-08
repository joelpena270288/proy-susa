import { Test, TestingModule } from '@nestjs/testing';
import { PlantaTratamientoService } from './planta-tratamiento.service';

describe('PlantaTratamientoService', () => {
  let service: PlantaTratamientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantaTratamientoService],
    }).compile();

    service = module.get<PlantaTratamientoService>(PlantaTratamientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
