import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUbicacionDto } from './dto/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dto/update-ubicacion.dto';
import {Ubicacion} from './entities/ubicacion.entity';
import { Repository } from 'typeorm';
import {Status} from '../../EntityStatus/entity.estatus.enum';
import { Log } from '../log/entities/log.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class UbicacionService {
  constructor(
    @Inject('UBICACION_REPOSITORY')
    private ubicacionRepository: Repository<Ubicacion>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
    
  ) {}
 async create(createUbicacionDto: CreateUbicacionDto,user: User): Promise<Ubicacion> {
    const found: Ubicacion = await this.ubicacionRepository.findOne({where: {name: createUbicacionDto.name.toUpperCase()}});
   try{ if(found){
    found.updatedAt = new Date();
    found.status = Status.ACTIVO;
    const log: Log = new Log();
    log.accion = "Activar";
    log.entidad = "Ubicacion";
    log.usuario = user.username;
    log.mensaje = "Se activo la ubicacion " + found.name;
    await this.logRepository.save(log);
    return await this.ubicacionRepository.save(found);
  }
  const ubicacion: Ubicacion = new Ubicacion();
  ubicacion.name = createUbicacionDto.name.toUpperCase();
  const log: Log = new Log();
  log.accion = "Crear";
  log.entidad = "Ubicacion";
  log.usuario = user.username;
  log.mensaje = "Se creo la ubicacion " + found.name;
  await this.logRepository.save(log);
  return await this.ubicacionRepository.save(ubicacion);
}catch {
throw new BadRequestException("Error al crear la Ubicacion");
}
   
  }

 async findAll(): Promise<Ubicacion[]> {
    return await this.ubicacionRepository.find({where: {status: Status.ACTIVO}});
  }

 async findOne(id: string):Promise<Ubicacion> {
    return await this.ubicacionRepository.findOne({where: {id: id}});
  }

 async update(id: string, updateUbicacionDto: UpdateUbicacionDto,user: User):Promise<Ubicacion> {
    const found: Ubicacion = await this.ubicacionRepository.findOne({where: {id:id}});
   try{ 
    if(found){
    found.updatedAt = new Date();
    found.name = updateUbicacionDto.name.toUpperCase();
    const log: Log = new Log();
    log.accion = "Editar";
    log.entidad = "Ubicacion";
    log.usuario = user.username;
    log.mensaje = "Se activo la ubicacion " + found.name;
    await this.logRepository.save(log);
    return await this.ubicacionRepository.save(found);
   }else{
    throw new NotFoundException("No existe la Ubicacion suministrada");
   }
  }catch{
    throw new BadRequestException("Error al editar la Ubicacion");

  }
  }

 async remove(id: string,user: User):Promise<Ubicacion> {
    const found: Ubicacion = await this.ubicacionRepository.findOne({where: {id:id}});
   try{ 
    if(found){
    found.updatedAt = new Date();
    found.status =Status.INACTIVO;
    const log: Log = new Log();
    log.accion = "Desahabilitar";
    log.entidad = "Ubicacion";
    log.usuario = user.username;
    log.mensaje = "Se desactivo la ubicacion " + found.name;
    await this.logRepository.save(log);
    return await this.ubicacionRepository.save(found);
   }else{
    throw new NotFoundException("No existe la Ubicacion suministrada");
   }
  }catch{
    throw new BadRequestException("Error al desahabilitar la Ubicacion");

  }
  }
}
