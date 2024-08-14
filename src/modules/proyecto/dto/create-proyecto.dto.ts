import { IsDecimal, IsEmail, IsNotEmpty } from "class-validator";
export class CreateProyectoDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    idCliente: string;
    @IsNotEmpty()
    idUbicacion: string;
    @IsNotEmpty()
    referencia: string;
    @IsDecimal()
    terreno: number;
    @IsDecimal()
    construccion: number;
	pozo: boolean;
	electricidad: number;
}
