import { IsString, IsInt, IsDate, IsEmail } from 'class-validator';
export class CreateTipoDocumentoDto {
    @IsString()
    name: string;
}
