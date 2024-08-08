import { IsString, IsInt, IsDate, IsEmail } from 'class-validator';
export class CreateNivelDto {
    @IsString()
    name: string;
}
