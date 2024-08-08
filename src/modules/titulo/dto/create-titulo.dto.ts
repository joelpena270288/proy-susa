import { IsString, IsInt, IsDate, IsEmail } from 'class-validator';
export class CreateTituloDto {
    @IsString()
    idProyecto: string;
    @IsString()
    name: string;
    @IsString()
    matricula: string;  
    @IsString()
    designacion: string;  

}
