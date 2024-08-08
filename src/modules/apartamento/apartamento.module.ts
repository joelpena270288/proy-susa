import { Module } from '@nestjs/common';
import { ApartamentoService } from './apartamento.service';
import { ApartamentoController } from './apartamento.controller';

@Module({
  controllers: [ApartamentoController],
  providers: [ApartamentoService],
})
export class ApartamentoModule {}
