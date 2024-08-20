import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class ReadDocumentoDto {
 
  @Exclude()
  dir: Buffer;
}
