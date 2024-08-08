import { DataSource } from 'typeorm';
import {PlantaTratamiento} from './entities/planta-tratamiento.entity';
export const PlantaTratamientoProviders = [
  {
    provide: 'PLANTATRATAMIENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PlantaTratamiento),
    inject: ['DATA_SOURCE'],
  },
];
