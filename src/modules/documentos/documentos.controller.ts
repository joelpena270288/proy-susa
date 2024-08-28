import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,UploadedFile,UseInterceptors, UsePipes, ValidationPipe  } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { User } from '../users/entities/user.entity';
import { GetUser } from '../auth/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
 
  create(@Body() body, @UploadedFile() file: Express.Multer.File,@GetUser() user: User) {
    return this.documentosService.create(JSON.parse(body.data),file.buffer,user);
  }

 
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentosService.findOne(id);
  }

  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/getAllByIdProyecto/:id')
  getAllByIdProyecto(@Param('id') id: string) {
    return this.documentosService.findAllByIdProyecto(id);
  }

  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@GetUser() user: User) {
    return this.documentosService.remove(id,user);
  }
}
