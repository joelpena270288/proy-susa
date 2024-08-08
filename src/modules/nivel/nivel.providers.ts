import { DataSource } from 'typeorm';
import { Nivel } from './entities/nivel.entity';
export const NivelProviders = [
  {
    provide: 'NIVEL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Nivel),
    inject: ['DATA_SOURCE'],
  },
];
