import { IsString, IsInt, IsDate, IsEmail, IsDecimal,IsBoolean,IsNotEmpty } from 'class-validator';

export class CreatePlantaTratamientoDto {
    @IsNotEmpty()
    idProyecto: string;
    @IsBoolean()
    valor: boolean;  
    @IsDecimal()
    capacidad: number;
}
