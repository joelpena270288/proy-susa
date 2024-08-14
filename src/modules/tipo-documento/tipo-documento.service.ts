import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo-documento.dto';
import { TipoDocumento } from './entities/tipo-documento.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { Log } from '../log/entities/log.entity';
@Injectable()
export class TipoDocumentoService {
  constructor(
    @Inject('TIPODOCUMENTO_REPOSITORY')
    private tipoRepository: Repository<TipoDocumento>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
  ) {}
  async create(
    createTipoDocumentoDto: CreateTipoDocumentoDto,
    user: User,
  ): Promise<TipoDocumento> {
    const found: TipoDocumento = await this.tipoRepository.findOne({
      where: { name: createTipoDocumentoDto.name.toUpperCase() },
    });
    try {
      if (found) {
        found.updatedAt = new Date();
        found.status = Status.ACTIVO;
        const log: Log = new Log();
        log.accion = 'Activar';
        log.entidad = 'Tipo Documento';
        log.usuario = user.username;
        log.mensaje = 'Se activo el tipo Documento ' + found.name;
        await this.logRepository.save(log);
        return await this.tipoRepository.save(found);
      }
      const tipo: TipoDocumento = new TipoDocumento();
      tipo.name = createTipoDocumentoDto.name.toUpperCase();
      const log: Log = new Log();
      log.accion = 'Crear';
      log.entidad = 'Tipo Documento';
      log.usuario = user.username;
      log.mensaje = 'Se creo El tipo Documento ' + tipo.name;
      await this.logRepository.save(log);
      return await this.tipoRepository.save(tipo);
    } catch {
      throw new BadRequestException('Error al crear el Tipo de Documento');
    }
  }

  async findAll(): Promise<TipoDocumento[]> {
    return await this.tipoRepository.find({ where: { status: Status.ACTIVO } });
  }

  async findOne(id: string): Promise<TipoDocumento> {
    return await this.tipoRepository.findOne({ where: { id: id } });
  }

  async update(
    id: string,
    updateTipoDocumentoDto: UpdateTipoDocumentoDto,
    user: User,
  ): Promise<TipoDocumento> {
    const found: TipoDocumento = await this.tipoRepository.findOne({
      where: { id: id },
    });
    try {
      if (found) {
        found.updatedAt = new Date();
        found.name = updateTipoDocumentoDto.name.toUpperCase();
        const log: Log = new Log();
        log.accion = 'Editar';
        log.entidad = 'Tipo Documento';
        log.usuario = user.username;
        log.mensaje = 'Se edito el tipo de documento ' + found.name;
        await this.logRepository.save(log);
        return await this.tipoRepository.save(found);
      } else {
        throw new NotFoundException(
          'No existe el tipo de documento suministrado',
        );
      }
    } catch {
      throw new BadRequestException('Error al editar el tipo de documento');
    }
  }

  async remove(id: string, user: User): Promise<TipoDocumento> {
    const found: TipoDocumento = await this.tipoRepository.findOne({
      where: { id: id },
    });
    try {
      if (found) {
        found.updatedAt = new Date();
        found.status = Status.INACTIVO;
        const log: Log = new Log();
        log.accion = 'Desahabilitar';
        log.entidad = 'Tipo Documento';
        log.usuario = user.username;
        log.mensaje = 'Se desactivo El tipo de Documento ' + found.name;
        await this.logRepository.save(log);
        return await this.tipoRepository.save(found);
      } else {
        throw new NotFoundException('No existe la Ubicacion suministrada');
      }
    } catch {
      throw new BadRequestException('Error al desahabilitar la Ubicacion');
    }
  }
}
