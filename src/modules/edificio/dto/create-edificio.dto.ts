import { IsString, IsInt, IsDate, IsEmail, IsNotEmpty ,IsBoolean} from 'class-validator';

export class CreateEdificioDto {
    @IsBoolean()
    valor: boolean;
    @IsNotEmpty()
    idProyecto: string;
    @IsInt()
    cantidad: number;
    @IsInt()
    niveles: number;
  
}
