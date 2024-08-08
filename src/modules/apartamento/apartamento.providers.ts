import { DataSource } from 'typeorm';
import { Apartamento } from './entities/apartamento.entity';
export const ApartamentoProviders = [
  {
    provide: 'APARTAMENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Apartamento),
    inject: ['DATA_SOURCE'],
  },
];
