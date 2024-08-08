import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TituloService } from './titulo.service';
import { CreateTituloDto } from './dto/create-titulo.dto';
import { UpdateTituloDto } from './dto/update-titulo.dto';
import { User } from '../users/entities/user.entity';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/user.decorator';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('titulo')
export class TituloController {
  constructor(private readonly tituloService: TituloService) {}
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createTituloDto: CreateTituloDto,@GetUser() user: User) {
    return this.tituloService.create(createTituloDto,user);
  }

  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTituloDto: UpdateTituloDto,@GetUser() user: User) {
    return this.tituloService.update(id, updateTituloDto,user);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@GetUser() user: User) {
    return this.tituloService.remove(id,user);
  }
}
