import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NivelService } from './nivel.service';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { User } from '../users/entities/user.entity';
import { GetUser } from '../auth/user.decorator';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('nivel')
export class NivelController {
  constructor(private readonly nivelService: NivelService) {}
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createNivelDto: CreateNivelDto,@GetUser() user: User) {
    return this.nivelService.create(createNivelDto,user);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.INVITADO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.nivelService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.INVITADO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nivelService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNivelDto: UpdateNivelDto,@GetUser() user: User) {
    return this.nivelService.update(id, updateNivelDto,user);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@GetUser() user: User) {
    return this.nivelService.remove(id,user);
  }
}
