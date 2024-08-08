import { PartialType } from '@nestjs/swagger';
import { CreateParqueoDto } from './create-parqueo.dto';

export class UpdateParqueoDto extends PartialType(CreateParqueoDto) {}
