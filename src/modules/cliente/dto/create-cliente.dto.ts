import { IsString, IsInt, IsDate, IsEmail,IsNotEmpty } from 'class-validator';
export class CreateClienteDto {
    @IsString()
    nombre: string;   
    apellidos: string;
    @IsString()
    direccion: string;
    @IsString()
    telefono: string;
    @IsString()
    tipoDocumento: string;
    @IsNotEmpty()
    rnc: string;   
    email: string;  
    nombrecontacto: string;
}
