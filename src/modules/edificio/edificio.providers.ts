import { DataSource } from 'typeorm';
import { Edificio } from './entities/edificio.entity';
export const EdificioProviders = [
  {
    provide: 'EDIFICIO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Edificio),
    inject: ['DATA_SOURCE'],
  },
];
