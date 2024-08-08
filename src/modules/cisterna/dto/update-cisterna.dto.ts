import { PartialType } from '@nestjs/swagger';
import { CreateCisternaDto } from './create-cisterna.dto';

export class UpdateCisternaDto extends PartialType(CreateCisternaDto) {}
