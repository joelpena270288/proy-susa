import { Injectable } from '@nestjs/common';
import { CreateEdificioDto } from './dto/create-edificio.dto';
import { UpdateEdificioDto } from './dto/update-edificio.dto';

@Injectable()
export class EdificioService {
  create(createEdificioDto: CreateEdificioDto) {
    return 'This action adds a new edificio';
  }

  findAll() {
    return `This action returns all edificio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} edificio`;
  }

  update(id: number, updateEdificioDto: UpdateEdificioDto) {
    return `This action updates a #${id} edificio`;
  }

  remove(id: number) {
    return `This action removes a #${id} edificio`;
  }
}
