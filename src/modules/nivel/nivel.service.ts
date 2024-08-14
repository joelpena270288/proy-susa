import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { Repository } from 'typeorm';
import { Nivel } from './entities/nivel.entity';
import { Log } from '../log/entities/log.entity';
import {Status} from '../../EntityStatus/entity.estatus.enum';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NivelService {
  constructor(
    @Inject('NIVEL_REPOSITORY')
    private nivelRepository: Repository<Nivel>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
    
  ) {}
async  create(createNivelDto: CreateNivelDto,user: User):Promise<Nivel> {
  const found: Nivel = await this.nivelRepository.findOne({where: {name: createNivelDto.name.toUpperCase()}});
  try{ 
    if(found){
   found.updatedAt = new Date();
   found.status = Status.ACTIVO;
   const log: Log = new Log();
   log.accion = "Activar";
   log.entidad = "Nivel";
   log.usuario = user.username;
   log.mensaje = "Se activo el nivel " + found.name;
   await this.logRepository.save(log);
   return await this.nivelRepository.save(found);
 }
 const nivel: Nivel = new Nivel();
 nivel.name = createNivelDto.name.toUpperCase();
 const log: Log = new Log();
 log.accion = "Crear";
 log.entidad = "Nivel";
 log.usuario = user.username;
 log.mensaje = "Se creo el nivel " + nivel.name;
 await this.logRepository.save(log);
 return await this.nivelRepository.save(nivel);
}catch {
throw new BadRequestException("Error al crear el nivel");
}
  
  }

 async findAll():Promise<Nivel[]> {
    return await this.nivelRepository.find({where:{status: Status.ACTIVO}});
  }

 async findOne(id: string):Promise<Nivel> {
    return await this.nivelRepository.findOne({where: {id: id}});
  }

 async update(id: string, updateNivelDto: UpdateNivelDto,user: User): Promise<Nivel> {
    const found: Nivel = await this.nivelRepository.findOne({where: {id:id}});
    try{ 
     if(found){
     found.updatedAt = new Date();
     found.name = updateNivelDto.name.toUpperCase();
     const log: Log = new Log();
     log.accion = "Editar";
     log.entidad = "Nivel";
     log.usuario = user.username;
     log.mensaje = "Se edito el nivel " + found.name;
     await this.logRepository.save(log);
     return await this.nivelRepository.save(found);
    }else{
     throw new NotFoundException("No existe el nivel suministrado");
    }
   }catch{
     throw new BadRequestException("Error al editar el nivel");
 
   }
  }

 async remove(id: string,user:User):Promise<Nivel> {
    const found: Nivel = await this.nivelRepository.findOne({where: {id:id}});
    try{ 
     if(found){
     found.updatedAt = new Date();
     found.status =Status.INACTIVO;
     const log: Log = new Log();
     log.accion = "Desahabilitar";
     log.entidad = "Nivel";
     log.usuario = user.username;
     log.mensaje = "Se desactivo el nivel " + found.name;
     await this.logRepository.save(log);
     return await this.nivelRepository.save(found);
    }else{
     throw new NotFoundException("No existe el nivel suministrado");
    }
   }catch{
     throw new BadRequestException("Error al desahabilitar el nivel");
 
   }
  }
}
