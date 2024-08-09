import { IsString, IsInt, IsDate, IsEmail, IsDecimal, IsBoolean } from 'class-validator';
export class CreateCisternaDto {
    @IsBoolean()
    valor: boolean;
    @IsDecimal()
    capacidad: number;
}
