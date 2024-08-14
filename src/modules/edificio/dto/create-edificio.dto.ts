import { IsString, IsInt, IsDate, IsEmail, IsNotEmpty ,IsBoolean} from 'class-validator';

export class CreateEdificioDto {
    @IsBoolean()
    valor: boolean;
   
    @IsInt()
    cantidad: number;
    @IsInt()
    niveles: number;
  
}
