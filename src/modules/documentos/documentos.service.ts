import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { Repository } from 'typeorm';
import { Documento } from './entities/documento.entity';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { Log } from '../log/entities/log.entity';
import { ReadDocumentoDto } from './dto/read-documento.dto';
import { User } from '../users/entities/user.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class DocumentosService {
  constructor(
    @Inject('DOCUMENTO_REPOSITORY')
    private documentoRepository: Repository<Documento>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>
  ) {}
 async create(createDocumentoDto: CreateDocumentoDto,user: User):Promise<ReadDocumentoDto> {
   

    try{
      const foundProyecto: Proyecto = await this.proyectoRepository.findOne({where: {id: createDocumentoDto.idProyecto}});
      if(!foundProyecto){
        throw new NotFoundException("El proyecto introducido no es valido");
      }
  const log: Log = new Log();
   log.accion = "Crear";
   log.entidad = "Documento";
   log.mensaje = "Se creo el documento " + createDocumentoDto.name +  "del proyecto " + foundProyecto.name; 
   log.usuario = user.username;
   await this.logRepository.save(log);
  const documento: Documento = new Documento();
  
  documento.file_name = createDocumentoDto.name;
  documento.proyecto = foundProyecto;
  documento.dir = createDocumentoDto.dir;
const result: Documento = await this.documentoRepository.save(documento);
  return plainToClass(ReadDocumentoDto, result);

      
    }catch{
      throw new BadRequestException("No se pudo crear el documento");

    }
  
  }


 async findOne(id: string):Promise<Documento> {
   return await this.documentoRepository
    .createQueryBuilder('documento')
    
    .where('documento.id = :id',{id: id})
    .getOne();
 }
   
 async findAllByIdProyecto(id: string):Promise<ReadDocumentoDto[]> {
   const documentos: Documento[] =  await this.documentoRepository
    .createQueryBuilder('documento')
    .innerJoin('documento.proyecto','proyecto')
    .where('proyecto.id = :id',{id: id})
    .getMany();
    return documentos.map((documento: Documento)=>plainToClass(ReadDocumentoDto,documento));
  }
  



  remove(id: string) {
    return `This action removes a #${id} documento`;
  }
}
