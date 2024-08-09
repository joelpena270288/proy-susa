import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UpdatePlantaTratamientoDto } from './dto/update-planta-tratamiento.dto';
import { Repository } from 'typeorm';
import { PlantaTratamiento } from './entities/planta-tratamiento.entity';

import { User } from '../users/entities/user.entity';
import { Log } from '../log/entities/log.entity';

@Injectable()
export class PlantaTratamientoService {
  constructor(
  @Inject('PLANTATRATAMIENTO_REPOSITORY')
  private plantaRepository: Repository<PlantaTratamiento>,
  @Inject('LOG_REPOSITORY')
  private logRepository: Repository<Log>
) {}


async  update(id: string, updatePlantaTratamientoDto: UpdatePlantaTratamientoDto,user: User): Promise<PlantaTratamiento> {
  try{
    const planta: PlantaTratamiento = await this.plantaRepository.findOne({where:{id: id}});
  if(!planta){
    throw new NotFoundException("La planta  Itroducido no es Valida");
  }
   
   planta.valor = updatePlantaTratamientoDto.valor;
   if(planta.valor ){
    planta.capacidad = updatePlantaTratamientoDto.capacidad;
    
   }else{
    planta.capacidad = 0;
   }
   planta.updatedAt = new Date();
   const log = new Log();
   log.accion = "Editar";
   log.entidad = "Planta Tratamiento";
   log.usuario = user.username;
   log.mensaje = "Se edito la planta de tratamiento _" + planta.id;
   await this.logRepository.save(log);
   return await this.plantaRepository.save(planta);
  }catch{
    throw new BadRequestException("Error al editar la Planta Tratamiento");
  }
   
  
  }

 
}
