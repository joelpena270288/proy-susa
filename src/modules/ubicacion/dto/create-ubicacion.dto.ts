import { IsString, IsInt, IsDate, IsEmail } from 'class-validator';
export class CreateUbicacionDto {
    @IsString()
    name: string;

}
