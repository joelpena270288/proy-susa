import { IsEmail, IsNotEmpty } from "class-validator";
export class CreateDocumentoDto {
    @IsNotEmpty()
    idProyecto: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    dir: Buffer;
}
