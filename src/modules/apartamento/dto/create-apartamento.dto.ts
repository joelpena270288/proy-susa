import { IsString, IsInt, IsDate, IsEmail, isNotEmpty } from 'class-validator';
export class CreateApartamentoDto {
    @IsString()
    idProyecto: string;
    @IsInt()
    cantidadAptos: number;
    @IsInt()
    cantidadHabitaciones: number;
}
