import { Injectable } from '@nestjs/common';
import { CreateParqueoDto } from './dto/create-parqueo.dto';
import { UpdateParqueoDto } from './dto/update-parqueo.dto';

@Injectable()
export class ParqueoService {
  create(createParqueoDto: CreateParqueoDto) {
    return 'This action adds a new parqueo';
  }

  findAll() {
    return `This action returns all parqueo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parqueo`;
  }

  update(id: number, updateParqueoDto: UpdateParqueoDto) {
    return `This action updates a #${id} parqueo`;
  }

  remove(id: number) {
    return `This action removes a #${id} parqueo`;
  }
}
