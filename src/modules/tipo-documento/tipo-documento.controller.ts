import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento.service';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo-documento.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { RolesGuard } from '../role/guards/roles.guard';
import { GetUser } from '../auth/user.decorator';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tipo-documento')
export class TipoDocumentoController {
  constructor(private readonly tipoDocumentoService: TipoDocumentoService) {}
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createTipoDocumentoDto: CreateTipoDocumentoDto,@GetUser() user: User) {
    return this.tipoDocumentoService.create(createTipoDocumentoDto,user);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.INVITADO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.tipoDocumentoService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.INVITADO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoDocumentoService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoDocumentoDto: UpdateTipoDocumentoDto,@GetUser() user: User) {
    return this.tipoDocumentoService.update(id, updateTipoDocumentoDto,user);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)

  @Delete(':id')
  remove(@Param('id') id: string,@GetUser() user: User) {
    return this.tipoDocumentoService.remove(id,user);
  }
}
