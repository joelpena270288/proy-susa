import { Injectable } from '@nestjs/common';
import { CreatePlantaTratamientoDto } from './dto/create-planta-tratamiento.dto';
import { UpdatePlantaTratamientoDto } from './dto/update-planta-tratamiento.dto';

@Injectable()
export class PlantaTratamientoService {
  create(createPlantaTratamientoDto: CreatePlantaTratamientoDto) {
    return 'This action adds a new plantaTratamiento';
  }

  findAll() {
    return `This action returns all plantaTratamiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plantaTratamiento`;
  }

  update(id: number, updatePlantaTratamientoDto: UpdatePlantaTratamientoDto) {
    return `This action updates a #${id} plantaTratamiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} plantaTratamiento`;
  }
}
