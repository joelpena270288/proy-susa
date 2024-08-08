import { DataSource } from 'typeorm';
import {Titulo} from './entities/titulo.entity';
export const TituloProviders = [
  {
    provide: 'TITULO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Titulo),
    inject: ['DATA_SOURCE'],
  },
];
