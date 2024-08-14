
import { IsString, IsInt, IsDate, IsEmail } from 'class-validator';
export class CreateContratoDto {
	
	  @IsString()
    idProyecto: string;
    @IsString()
    name: string;
  

}
