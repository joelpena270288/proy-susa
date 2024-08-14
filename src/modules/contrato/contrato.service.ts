import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { Repository } from 'typeorm';
import { Contrato } from './entities/contrato.entity';
import { Log } from '../log/entities/log.entity';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ContratoService {
  constructor(
    @Inject('CONTRATO_REPOSITORY')
    private contratoRepository: Repository<Contrato>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
    
  ) {}
 async create(createContratoDto: CreateContratoDto,user: User): Promise<Contrato> {
  const foundProyecto: Proyecto = await this.proyectoRepository.findOne({where: {id: createContratoDto.idProyecto}});
  if(!foundProyecto){
    throw new NotFoundException("El proyecto introducido no es valido");
  }
  const log: Log = new Log();
  log.accion = "Crear";
  log.entidad = "Contrato";
  log.mensaje = "Se Creo el contrato " + createContratoDto.name + " del proyecto " + foundProyecto.name;
  log.usuario = user.username;
  try{
    const contrato: Contrato = new Contrato();
   
    contrato.name = createContratoDto.name;
    contrato.proyecto = foundProyecto;
  await this.logRepository.save(log);
  return await this.contratoRepository.save(contrato);
  } catch{
    throw new BadRequestException("Error al crear el contrato");
  }

  }


  

 async update(id: string, updateContratoDto: UpdateContratoDto,user: User):Promise<Contrato> {
  const found: Contrato = await this.contratoRepository
  .createQueryBuilder('contrato')
  .innerJoinAndSelect('contrato.proyecto', 'proyecto')
  .where('contrato.id =:id',{id: id})
  .getOne();
  if(!found){
    throw new NotFoundException("El contrato introducido no es correcto");
   }
   try{
   const log: Log = new Log();
   log.accion = "Editar";
   log.entidad = "Contrato";
   log.mensaje = "Se edito el contrato " + found.name +  "del proyecto " + found.proyecto.name; 
   log.usuario = user.username;
   await this.logRepository.save(log);
  found.name = updateContratoDto.name;
  found.updatedAt = new Date();
   return await this.contratoRepository.save(found);
    
  
}
catch{
  throw new BadRequestException("No se pudo editar el contrato");
}
  }

 async remove(id: string,user:User):Promise<Contrato> {
  const found: Contrato = await this.contratoRepository
  .createQueryBuilder('contrato')
  .innerJoinAndSelect('contrato.proyecto', 'proyecto')
  .where('contrato.id =:id',{id: id})
  .getOne();
  if(!found){
    throw new NotFoundException("El Contrato introducido no es correcto");
   }
   try{
   const log: Log = new Log();
   log.accion = "Eliminar";
   log.entidad = "Contrato";
   log.mensaje = "Se elimino el Contrato " + found.name +  "del proyecto " + found.proyecto.name; 
   log.usuario = user.username;
   await this.logRepository.save(log);
  
   
   return await this.contratoRepository.remove(found);
  }catch{
    throw new BadRequestException("No se pudo eliminar el contrato");
  }
  }
}
