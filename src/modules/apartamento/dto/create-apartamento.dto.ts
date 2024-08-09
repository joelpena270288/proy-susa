import { IsString, IsInt, IsDate, IsEmail, isNotEmpty } from 'class-validator';
export class CreateApartamentoDto {
    id: string;
    @IsInt()
    cantidadAptos: number;
    @IsInt()
    cantidadHabitaciones: number;
}
