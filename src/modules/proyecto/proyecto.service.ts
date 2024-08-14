import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './entities/proyecto.entity';
import { Repository } from 'typeorm';
import { Log } from '../log/entities/log.entity';
import { User } from '../users/entities/user.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Cisterna } from '../cisterna/entities/cisterna.entity';
import { Edificio } from '../edificio/entities/edificio.entity';
import { Parqueo } from '../parqueo/entities/parqueo.entity';
import { PlantaTratamiento } from '../planta-tratamiento/entities/planta-tratamiento.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { Ubicacion } from '../ubicacion/entities/ubicacion.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
    @Inject('CLIENTE_REPOSITORY')
    private clienteRepository: Repository<Cliente>,
    @Inject('UBICACION_REPOSITORY')
    private ubicacionRepository: Repository<Ubicacion>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
  ) {}
async  create(createProyectoDto: CreateProyectoDto,user: User): Promise<Proyecto> {
  try{
    const proyecto: Proyecto = new Proyecto();
    const cliente: Cliente = await this.clienteRepository.findOne({where:{id: createProyectoDto.idCliente}});
    if(!cliente){
     throw new NotFoundException("El cliente no esta registrado");
    }
    const ubicacion: Ubicacion = await this.ubicacionRepository.findOne({where:{id: createProyectoDto.idUbicacion}});
    if(!ubicacion){
      throw new NotFoundException("La Ubicacion Introducida no es correcta");
    }
    proyecto.name = createProyectoDto.name;
    proyecto.cliente = cliente;
    proyecto.cisterna = new Cisterna();
    proyecto.construccion = createProyectoDto.construccion;
    proyecto.edificio = new Edificio();
    proyecto.parqueo = new Parqueo();
    proyecto.planta = new PlantaTratamiento();
    proyecto.referencia = createProyectoDto.referencia;
    proyecto.terreno = createProyectoDto.terreno;
    proyecto.ubicacion = ubicacion;
    const log: Log = new Log();
    log.accion = "Crear";
    log.entidad = "Proyecto";
    log.usuario = user.username;
    log.mensaje = "Se creo el proyecto_" + proyecto.name + " " + cliente.nombre;
    await this.logRepository.save(log);
 
   return await this.proyectoRepository.save(proyecto);
  }catch(e){
    console.log(e);
    throw new BadRequestException("Error al crear el proyecto");
  }
  
  }

 async findAll():Promise<Proyecto[]> {
    return  await this.proyectoRepository
    .createQueryBuilder('proyecto')
    .innerJoinAndSelect('proyecto.cliente','cliente')
    .innerJoinAndSelect('proyecto.ubicacion','ubicacion')
    .getMany();
  }

 async findOne(id: string):Promise<Proyecto> {
   const proyecto: Proyecto =  await this.proyectoRepository
    .createQueryBuilder('proyecto')
    .innerJoinAndSelect('proyecto.cliente','cliente')
    .innerJoinAndSelect('proyecto.ubicacion','ubicacion')
    .leftJoinAndSelect('proyecto.titulos','titulos')
    .leftJoinAndSelect('proyecto.contratos','contratos')
    .innerJoinAndSelect('proyecto.edificio','edificio')
    .leftJoinAndSelect('proyecto.apartamentos','apartamentos')
    .innerJoinAndSelect('proyecto.parqueo','parqueo')
    .leftJoinAndSelect('parqueo.niveles','niveles')
    .innerJoinAndSelect('proyecto.cisterna','cisterna')
    .innerJoinAndSelect('proyecto.planta','planta')
    .leftJoinAndSelect('proyecto.documentos','documentos')	
    .leftJoinAndSelect('documentos.tipo','tipo')
    .where('proyecto.id = :idProyecto',{idProyecto: id})
    .getOne();
    if(!proyecto){
      throw new NotFoundException("No existe el proyecto suministrado");
    }
    return proyecto;
  }

 async update(id: string, updateProyectoDto: UpdateProyectoDto,user:User): Promise<Proyecto> {
   try{
    const proyecto: Proyecto = await this.proyectoRepository.findOne({where:{id: id}});
   if(!proyecto){
 throw new NotFoundException("No se encontro el proyecto solicitado");

   }
   if(updateProyectoDto.idCliente !==""){
	    const cliente: Cliente = await this.clienteRepository.findOne({where:{id: updateProyectoDto.idCliente}});
   if(!cliente){
    throw new NotFoundException("El cliente no esta registrado");
   }else{
	   proyecto.cliente = cliente;
   }
   }
  if(updateProyectoDto.idUbicacion!==""){
	 const ubicacion: Ubicacion = await this.ubicacionRepository.findOne({where:{id: updateProyectoDto.idUbicacion}});
   if(!ubicacion){
     throw new NotFoundException("La Ubicacion Introducida no es correcta");
   }else{
	   proyecto.ubicacion = ubicacion;
   }  
  }
  
   proyecto.name = updateProyectoDto.name;  
   proyecto.construccion = updateProyectoDto.construccion;   
   proyecto.referencia = updateProyectoDto.referencia;
   proyecto.terreno = updateProyectoDto.terreno;   
   proyecto.pozo = updateProyectoDto.pozo;
   proyecto.electricidad = updateProyectoDto.electricidad;
   proyecto.updatedAt = new Date();
   const log: Log = new Log();
   log.accion = "Editar";
   log.entidad = "Proyecto";
   log.usuario = user.username;
   log.mensaje = "Se edito el proyecto_" + proyecto.id ;
   await this.logRepository.save(log);

  return await this.proyectoRepository.save(proyecto);


   }catch{
    throw new BadRequestException("Error al editar el proyecto");
   }

   
  }

async  remove(id: string,user:User):Promise<Proyecto> {
  try{
    const proyecto: Proyecto = await this.proyectoRepository.findOne({where:{id: id}});
    if(!proyecto){
      throw new NotFoundException("No se encontro el proyecto solicitado");
     
        }
        proyecto.status = Status.INACTIVO;
        proyecto.updatedAt = new Date();
        const log: Log = new Log();
        log.accion = "Desahabilitar";
        log.entidad = "Proyecto";
        log.usuario = user.username;
        log.mensaje = "Se edito el Desahabilito " + proyecto.id;
        await this.logRepository.save(log);
     
       return await this.proyectoRepository.save(proyecto);

  }catch{
    throw new BadRequestException("No se Pudo Eliminar el Proyecto");
  }
   
  }
}
