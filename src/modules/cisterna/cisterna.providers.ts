import { DataSource } from 'typeorm';
import { Cisterna } from './entities/cisterna.entity';
export const CisternaProviders = [
  {
    provide: 'CISTERNA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cisterna),
    inject: ['DATA_SOURCE'],
  },
];
