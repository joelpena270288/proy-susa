import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CisternaService } from './cisterna.service';
import { CreateCisternaDto } from './dto/create-cisterna.dto';
import { UpdateCisternaDto } from './dto/update-cisterna.dto';

@Controller('cisterna')
export class CisternaController {
  constructor(private readonly cisternaService: CisternaService) {}

  @Post()
  create(@Body() createCisternaDto: CreateCisternaDto) {
    return this.cisternaService.create(createCisternaDto);
  }

  @Get()
  findAll() {
    return this.cisternaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cisternaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCisternaDto: UpdateCisternaDto) {
    return this.cisternaService.update(+id, updateCisternaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cisternaService.remove(+id);
  }
}
