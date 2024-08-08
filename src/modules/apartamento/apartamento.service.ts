import { Injectable } from '@nestjs/common';
import { CreateApartamentoDto } from './dto/create-apartamento.dto';
import { UpdateApartamentoDto } from './dto/update-apartamento.dto';

@Injectable()
export class ApartamentoService {
  create(createApartamentoDto: CreateApartamentoDto) {
    return 'This action adds a new apartamento';
  }

  findAll() {
    return `This action returns all apartamento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apartamento`;
  }

  update(id: number, updateApartamentoDto: UpdateApartamentoDto) {
    return `This action updates a #${id} apartamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} apartamento`;
  }
}
