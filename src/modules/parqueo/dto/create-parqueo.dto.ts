import { IsString, IsInt, IsDate, IsEmail, IsDecimal } from 'class-validator';
export class CreateParqueoDto {   
    @IsString()
    idProyecto: string; 
    idNiveles: string[];
}
