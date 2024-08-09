import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CisternaService } from './cisterna.service';
import { CreateCisternaDto } from './dto/create-cisterna.dto';
import { UpdateCisternaDto } from './dto/update-cisterna.dto';
import { GetUser } from '../auth/user.decorator';
import { User } from '../users/entities/user.entity';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('cisterna')
export class CisternaController {
  constructor(private readonly cisternaService: CisternaService) {}
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCisternaDto: UpdateCisternaDto,@GetUser() user: User) {
    return this.cisternaService.update(id, updateCisternaDto,user);
  }

}
