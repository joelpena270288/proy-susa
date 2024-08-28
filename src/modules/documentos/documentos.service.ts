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
 async create(createDocumentoDto:CreateDocumentoDto,data: Buffer, user: User):Promise<ReadDocumentoDto> {
 

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
  documento.dir = data;
const result: Documento = await this.documentoRepository.save(documento);
  return plainToClass(ReadDocumentoDto, result);

      
    }catch(e){
      console.log(e);
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
  



 async remove(id: string,user: User):Promise<ReadDocumentoDto> {
 const found: Documento = await this.documentoRepository
  .createQueryBuilder('documento')
  .innerJoinAndSelect('documento.proyecto','proyecto')
  .where('documento.id = :id',{id: id})
  .getOne();
  
  if(!found){
    throw new NotFoundException("El documento introducido no es valido");
  }
 try{
  await this.documentoRepository.remove(found);
   const log: Log = new Log();
  log.accion = "Eliminar";
  log.entidad = "Documento";
  log.mensaje = "Se elimino el documento " + found.file_name +  "del proyecto " + found.proyecto.name; 
  log.usuario = user.username;
  await this.logRepository.save(log);
  return plainToClass(ReadDocumentoDto, found);
 }catch{
  throw new BadRequestException("No se pudo eliminar el documento");
 }


}
}
