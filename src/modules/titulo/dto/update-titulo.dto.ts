import { PartialType } from '@nestjs/swagger';
import { CreateTituloDto } from './create-titulo.dto';

export class UpdateTituloDto extends PartialType(CreateTituloDto) {}
