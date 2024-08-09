import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCisternaDto } from './dto/create-cisterna.dto';
import { UpdateCisternaDto } from './dto/update-cisterna.dto';
import { Cisterna } from './entities/cisterna.entity';
import { Log } from '../log/entities/log.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CisternaService {
  constructor(
    @Inject('CISTERNA_REPOSITORY')
    private cisternaRepository: Repository<Cisterna>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,

  ) {}
async  update(id: string, updateCisternaDto: UpdateCisternaDto,user: User):Promise<Cisterna> {
    try{
      const cisterna: Cisterna = await this.cisternaRepository.findOne({where:{id: id}});
      if(!cisterna){
       throw new NotFoundException("No existe la Cisterna Introducida");
      }
      cisterna.valor = updateCisternaDto.valor;
      if(cisterna.valor){
       cisterna.capacidad = updateCisternaDto.capacidad;
      }else{
       cisterna.capacidad = 0;
      }
     const log: Log = new Log();
    log.accion = "Editar";
    log.entidad = "Cisterna";
    log.usuario = user.username;
    log.mensaje = "Se edito la Cisterna _" + cisterna.id; 
    await this.logRepository.save(log); 
    return await this.cisternaRepository.save(cisterna);

    }catch{
      throw new BadRequestException("Error al editar la Cisterna");
    }
  

  }

 
}
