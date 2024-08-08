import { DataSource } from 'typeorm';
import {Parqueo} from './entities/parqueo.entity';
export const ParqueoProviders = [
  {
    provide: 'PARQUEO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Parqueo),
    inject: ['DATA_SOURCE'],
  },
];
