import { Module } from '@nestjs/common';
import { ApartamentoService } from './apartamento.service';
import { ApartamentoController } from './apartamento.controller';
import {DatabaseModule} from '../../database/database.module';
import { ApartamentoProviders } from './apartamento.providers';
import { LogProviders } from '../log/log.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ApartamentoController],
  providers: [ApartamentoService,...ApartamentoProviders,...LogProviders],
  exports: [ApartamentoService]
})
export class ApartamentoModule {}
