import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlantaTratamientoService } from './planta-tratamiento.service';
import { CreatePlantaTratamientoDto } from './dto/create-planta-tratamiento.dto';
import { UpdatePlantaTratamientoDto } from './dto/update-planta-tratamiento.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { GetUser } from '../auth/user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('planta-tratamiento')
export class PlantaTratamientoController {
  constructor(private readonly plantaTratamientoService: PlantaTratamientoService) {}
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlantaTratamientoDto: UpdatePlantaTratamientoDto,@GetUser() user: User) {
    return this.plantaTratamientoService.update(id, updatePlantaTratamientoDto,user);
  }

}
