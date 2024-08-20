
import { IsString, IsInt, IsDate, IsEmail,IsNotEmpty } from 'class-validator';
export class CreateContratoDto {
	
	  @IsString()
    idProyecto: string;
    @IsNotEmpty()
    name: string;
  

}
