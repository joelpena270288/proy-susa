import { DataSource } from 'typeorm';
import { Contrato } from './entities/contrato.entity';
export const ContratoProviders = [
  {
    provide: 'CONTRATO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Contrato),
    inject: ['DATA_SOURCE'],
  },
];
