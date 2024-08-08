import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlantaTratamientoService } from './planta-tratamiento.service';
import { CreatePlantaTratamientoDto } from './dto/create-planta-tratamiento.dto';
import { UpdatePlantaTratamientoDto } from './dto/update-planta-tratamiento.dto';

@Controller('planta-tratamiento')
export class PlantaTratamientoController {
  constructor(private readonly plantaTratamientoService: PlantaTratamientoService) {}

  @Post()
  create(@Body() createPlantaTratamientoDto: CreatePlantaTratamientoDto) {
    return this.plantaTratamientoService.create(createPlantaTratamientoDto);
  }

  @Get()
  findAll() {
    return this.plantaTratamientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantaTratamientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlantaTratamientoDto: UpdatePlantaTratamientoDto) {
    return this.plantaTratamientoService.update(+id, updatePlantaTratamientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantaTratamientoService.remove(+id);
  }
}
