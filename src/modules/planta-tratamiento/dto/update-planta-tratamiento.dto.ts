import { PartialType } from '@nestjs/swagger';
import { CreatePlantaTratamientoDto } from './create-planta-tratamiento.dto';

export class UpdatePlantaTratamientoDto extends PartialType(CreatePlantaTratamientoDto) {}
