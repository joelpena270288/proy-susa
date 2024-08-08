import { Injectable } from '@nestjs/common';
import { CreateCisternaDto } from './dto/create-cisterna.dto';
import { UpdateCisternaDto } from './dto/update-cisterna.dto';

@Injectable()
export class CisternaService {
  create(createCisternaDto: CreateCisternaDto) {
    return 'This action adds a new cisterna';
  }

  findAll() {
    return `This action returns all cisterna`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cisterna`;
  }

  update(id: number, updateCisternaDto: UpdateCisternaDto) {
    return `This action updates a #${id} cisterna`;
  }

  remove(id: number) {
    return `This action removes a #${id} cisterna`;
  }
}
