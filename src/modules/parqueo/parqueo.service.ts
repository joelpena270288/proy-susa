import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateParqueoDto } from './dto/create-parqueo.dto';
import { UpdateParqueoDto } from './dto/update-parqueo.dto';
import { Repository } from 'typeorm';
import { Parqueo } from './entities/parqueo.entity';
import { Nivel } from '../nivel/entities/nivel.entity';
import { User } from '../users/entities/user.entity';
import { Log } from '../log/entities/log.entity';

@Injectable()
export class ParqueoService {
  constructor(
    @Inject('PARQUEO_REPOSITORY')
    private parqueoRepository: Repository<Parqueo>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
    @Inject('NIVEL_REPOSITORY')
    private nivelRepository: Repository<Nivel>
  ) {}

 
 async update(id: string, updateParqueoDto: UpdateParqueoDto,user: User):Promise<Parqueo> {
    try{
      const parqueo: Parqueo = await this.parqueoRepository.findOne({where:{id: id}});
      if(!parqueo){
        throw new NotFoundException("El Parqueo  Itroducido no es Valido");
      }
      const niveles: Nivel[] = new Array();
      for (let index = 0; index < updateParqueoDto.idNiveles.length; index++) {
       const nivel = await this.nivelRepository.findOne({where: {id: updateParqueoDto.idNiveles[index]}});
       if(nivel){
        niveles.push(nivel);
       }   
    }
    parqueo.niveles = niveles;
    parqueo.updatedAt = new Date();
     
    
     const log = new Log();
     log.accion = "Editar";
     log.entidad = "Parqueo";
     log.usuario = user.username;
     log.mensaje = "Se el Parqueo _" + parqueo.id;
     await this.logRepository.save(log);
     return await this.parqueoRepository.save(parqueo);
    }catch{
      throw new BadRequestException("Error al editar la Planta Tratamiento");
    }
     
    
  }

}
