import { BadGatewayException, BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { User } from '../users/entities/user.entity';
import {Status} from '../../EntityStatus/entity.estatus.enum';
import { Log } from '../log/entities/log.entity';

@Injectable()
export class ClienteService {
  constructor(
    @Inject('CLIENTE_REPOSITORY')
    private clienteRepository: Repository<Cliente>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
  ) {}

 async create(createClienteDto: CreateClienteDto,user: User): Promise<Cliente> {
   try{
    const cliente: Cliente = await this.clienteRepository.findOne({where: {rnc: createClienteDto.rnc}});
    if(cliente){
     cliente.status = Status.ACTIVO;
     await this.clienteRepository.save(cliente);
     const log: Log = new Log();
     log.accion = "Activar";
     log.entidad = "Cliente";
     log.usuario = user.username;
     log.mensaje = "Se Activo el cliente " + cliente.rnc; 
     await this.logRepository.save(log);
     throw new ConflictException("Ya existe un cliente con ese RNC");
    
    }
 
    const nuevoCliente: Cliente = new Cliente();
    nuevoCliente.direccion = createClienteDto.direccion;
    nuevoCliente.email = createClienteDto.email;
    nuevoCliente.nombre = createClienteDto.nombre;
    nuevoCliente.nombrecontacto = createClienteDto.nombrecontacto;
    nuevoCliente.rnc = createClienteDto.rnc;
    nuevoCliente.telefono = createClienteDto.telefono;
    nuevoCliente.tipoDocumento = createClienteDto.tipoDocumento;
    const log: Log = new Log();
     log.accion = "Crear";
     log.entidad = "Cliente";
     log.usuario = user.username;
     log.mensaje = "Se Creo el cliente " + nuevoCliente.rnc; 
     await this.logRepository.save(log);
     return this.clienteRepository.save(nuevoCliente);
 
 
   } catch{
    throw new BadRequestException("Error al crear el ciente");
   }
 

  }

 async findAll():Promise<Cliente[]> {
    return await this.clienteRepository.find({where: {status: Status.ACTIVO}});
  }

 async  findOne(id: string):Promise<Cliente> {
    return  await this.clienteRepository.findOne({where: {id: id}});
  }

 async update(id: string, updateClienteDto: UpdateClienteDto, user: User):Promise<Cliente> {
  
    try{
      const cliente: Cliente = await this.clienteRepository.findOne({where: {id: id}});
      if(!cliente){
      throw new NotFoundException("El Cliente introducido no es valido");
      
      }
      cliente.direccion = updateClienteDto.direccion;
      cliente.email = updateClienteDto.email;
      cliente.nombre = updateClienteDto.nombre;
      cliente.nombrecontacto = updateClienteDto.nombrecontacto;
      cliente.rnc = updateClienteDto.rnc;
      cliente.telefono = updateClienteDto.telefono;
      cliente.updatedAt = new Date();
      const log: Log = new Log();
       log.accion = "Editar";
       log.entidad = "Cliente";
       log.usuario = user.username;
       log.mensaje = "Se Edito el cliente " + cliente.rnc; 
       await this.logRepository.save(log);
       return this.clienteRepository.save(cliente);
   
   
     } catch{
      throw new BadRequestException("Error al Editar el ciente");
     }
   

  }

 async remove(id: string,user: User):Promise<Cliente> {
   
    try{
      const cliente: Cliente = await this.clienteRepository.findOne({where: {id: id}});
      if(!cliente){
      throw new NotFoundException("El Cliente introducido no es valido");
      
      }
   
    
      cliente.status = Status.INACTIVO;
      cliente.updatedAt = new Date();
      const log: Log = new Log();
       log.accion = "Desahabilitar";
       log.entidad = "Cliente";
       log.usuario = user.username;
       log.mensaje = "Se Desahabilito el cliente " + cliente.rnc; 
       await this.logRepository.save(log);
       return this.clienteRepository.save(cliente);
   
   
     } catch{
      throw new BadRequestException("Error al Desahabilitar el ciente");
     }
   
  }
}
