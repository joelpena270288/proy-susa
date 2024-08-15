import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateApartamentoDto } from './dto/create-apartamento.dto';
import { UpdateApartamentoDto } from './dto/update-apartamento.dto';
import { Repository } from 'typeorm';
import { Apartamento } from './entities/apartamento.entity';
import { Log } from '../log/entities/log.entity';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ApartamentoService {
  constructor(
    @Inject('APARTAMENTO_REPOSITORY')
    private apartamentoRepository: Repository<Apartamento>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
    
  ) {}
 async create(createApartamentoDto: CreateApartamentoDto,user: User):Promise<Apartamento> {
    const foundProyecto: Proyecto = await this.proyectoRepository.findOne({where: {id: createApartamentoDto.idProyecto}});
  if(!foundProyecto){
    throw new NotFoundException("El proyecto introducido no es valido");
  }
  const log: Log = new Log();
  log.accion = "Crear";
  log.entidad = "Apartamento";
  log.mensaje = "Se Creo el apartamento  al proyecto " + foundProyecto.name;
  log.usuario = user.username;
  try{
    const apartamento: Apartamento = new Apartamento();
    apartamento.cantidadHabitaciones = createApartamentoDto.cantidadHabitaciones;
    apartamento.cantidadAptos = createApartamentoDto.cantidadAptos;   
    apartamento.proyecto = foundProyecto;
  await this.logRepository.save(log);
  return await this.apartamentoRepository.save(apartamento);
  } catch{
    throw new BadRequestException("Error al crear el apartamento");
  }

  }

 
 
 async update(id: string, updateApartamentoDto: UpdateApartamentoDto,user: User):Promise<Apartamento> {
  const found: Apartamento = await this.apartamentoRepository
  .createQueryBuilder('apartamento')
  .innerJoinAndSelect('apartamento.proyecto', 'proyecto')
  .where('apartamento.id =:id',{id: id})
  .getOne();
  if(!found){
    throw new NotFoundException("El apartamento introducido no es correcto");
   }
   try{
   const log: Log = new Log();
   log.accion = "Editar";
   log.entidad = "Apartamento";
   log.mensaje = "Se edito el apartamento " + found.id +  "del proyecto " + found.proyecto.name; 
   log.usuario = user.username;
   await this.logRepository.save(log);
  
   found.cantidadAptos = updateApartamentoDto.cantidadAptos;
   found.cantidadHabitaciones = updateApartamentoDto.cantidadHabitaciones;
 
   return await this.apartamentoRepository.save(found);
    
  
}
catch{
  throw new BadRequestException("No se pudo editar el apartamento");
}
   
  }

 async remove(id: string,user: User):Promise<Apartamento> {
  const found: Apartamento = await this.apartamentoRepository
  .createQueryBuilder('apartamento')
  .innerJoinAndSelect('apartamento.proyecto', 'proyecto')
  .where('apartamento.id =:id',{id: id})
  .getOne();
  if(!found){
    throw new NotFoundException("El apartamento introducido no es correcto");
   }
   try{
   const log: Log = new Log();
   log.accion = "Eliminar";
   log.entidad = "Apartamento";
   log.mensaje = "Se elimino el apartamento " + found.id +  "del proyecto " + found.proyecto.name; 
   log.usuario = user.username;
   await this.logRepository.save(log);
  
   
   return await this.apartamentoRepository.remove(found);
  }catch{
    throw new BadRequestException("No se pudo eliminar el apartamento");
  }
  }
}
