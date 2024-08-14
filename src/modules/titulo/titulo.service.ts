import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTituloDto } from './dto/create-titulo.dto';
import { UpdateTituloDto } from './dto/update-titulo.dto';
import { Titulo } from './entities/titulo.entity';
import { Log } from '../log/entities/log.entity';
import { User } from '../users/entities/user.entity';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TituloService {
  constructor(
    @Inject('TITULO_REPOSITORY')
    private tituloRepository: Repository<Titulo>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
    
  ) {}
 async create(createTituloDto: CreateTituloDto,user: User):Promise<Titulo> {
   const foundProyecto: Proyecto = await this.proyectoRepository.findOne({where: {id: createTituloDto.idProyecto}});
  if(!foundProyecto){
    throw new NotFoundException("El proyecto introducido no es valido");
  }
  const log: Log = new Log();
  log.accion = "Crear";
  log.entidad = "Titulo";
  log.mensaje = "Se Creo el titulo " + createTituloDto.name + " del proyecto " + foundProyecto.name;
  log.usuario = user.username;
  try{
    const titulo: Titulo = new Titulo();
    titulo.designacion = createTituloDto.designacion;
    titulo.matricula = createTituloDto.matricula;
    titulo.name = createTituloDto.name;
    titulo.proyecto = foundProyecto;
  await this.logRepository.save(log);
  return await this.tituloRepository.save(titulo);
  } catch{
    throw new BadRequestException("Error al crear el titulo");
  }


  } 

  async update(id: string, updateTituloDto: UpdateTituloDto,user: User):Promise<Titulo> {
  const found: Titulo = await this.tituloRepository
  .createQueryBuilder('titulo')
  .innerJoinAndSelect('titulo.proyecto', 'proyecto')
  .where('titulo.id =:id',{id: id})
  .getOne();
  if(!found){
    throw new NotFoundException("El titulo introducido no es correcto");
   }
   try{
   const log: Log = new Log();
   log.accion = "Editar";
   log.entidad = "Titulo";
   log.mensaje = "Se edito el titulo " + found.name +  "del proyecto " + found.proyecto.name; 
   log.usuario = user.username;
   await this.logRepository.save(log);
  
   found.designacion = updateTituloDto.designacion;
   found.matricula = updateTituloDto.matricula;
   found.name = updateTituloDto.name;
   return await this.tituloRepository.save(found);
    
  
}
catch{
  throw new BadRequestException("No se pudo editar el titulo");
}
   
}

 async remove(id: string,user: User):Promise<Titulo> {
  const found: Titulo = await this.tituloRepository
  .createQueryBuilder('titulo')
  .innerJoinAndSelect('titulo.proyecto', 'proyecto')
  .where('titulo.id =:id',{id: id})
  .getOne();
  if(!found){
    throw new NotFoundException("El titulo introducido no es correcto");
   }
   try{
   const log: Log = new Log();
   log.accion = "Eliminar";
   log.entidad = "Titulo";
   log.mensaje = "Se elimino el titulo " + found.name +  "del proyecto " + found.proyecto.name; 
   log.usuario = user.username;
   await this.logRepository.save(log);
  
   
   return await this.tituloRepository.remove(found);
  }catch{
    throw new BadRequestException("No se pudo eliminar el titulo");
  }
}
}
