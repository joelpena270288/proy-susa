import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import {Proyecto} from '../../proyecto/entities/proyecto.entity';
export class ReadDocumentoDto {
 
  @Exclude()
  dir: Buffer;
  @Exclude()
  proyecto: Proyecto;
}
