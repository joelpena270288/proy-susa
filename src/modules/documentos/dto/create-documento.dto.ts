import { IsEmail, IsNotEmpty } from "class-validator";
export class CreateDocumentoDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    dir: string;
}
