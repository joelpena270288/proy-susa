import { DataSource } from 'typeorm';
import {Ubicacion} from './entities/ubicacion.entity';
export const UbicacionProviders = [
  {
    provide: 'UBICACION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Ubicacion),
    inject: ['DATA_SOURCE'],
  },
];
