import { IsEmail, IsNotEmpty ,IsString} from "class-validator";
export class CreateDocumentoDto {
    @IsString()
    idProyecto: string;
    @IsString()
    name: string;
  
}
