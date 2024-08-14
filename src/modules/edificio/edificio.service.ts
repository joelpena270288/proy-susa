import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEdificioDto } from './dto/create-edificio.dto';
import { UpdateEdificioDto } from './dto/update-edificio.dto';
import { Edificio } from './entities/edificio.entity';
import { User } from '../users/entities/user.entity';
import { Apartamento } from '../apartamento/entities/apartamento.entity';
import { Log } from '../log/entities/log.entity';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EdificioService {
  constructor(
    @Inject('EDIFICIO_REPOSITORY')
    private edificioRepository: Repository<Edificio>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
    @Inject('APARTAMENTO_REPOSITORY')
    private apartamentoRepository: Repository<Apartamento>,
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
  ) {}
  async update(id: string, updateEdificioDto: UpdateEdificioDto,user: User): Promise<Edificio> {
  try{  
    const edificio: Edificio = await this.edificioRepository.findOne({where: {id: id}});
    
    edificio.valor = updateEdificioDto.valor; 
    if(edificio.valor){
      edificio.cantidad = updateEdificioDto.cantidad;
      edificio.niveles = updateEdificioDto.niveles;
     
    }else{
      edificio.cantidad = 0;
      edificio.niveles = 0;
    }  
    edificio.updatedAt = new Date();
    const log: Log = new Log();
    log.accion = "Editar";
    log.entidad = "Edificio";
    log.usuario = user.username;
    log.mensaje = "Edito el edificio _" + edificio.id;
    return await this.edificioRepository.save(edificio);
    }
  catch{
    throw new BadRequestException("Hubo un error al editar la informacion");
  }
 
 

  }

 
}
