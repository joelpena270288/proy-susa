import { DataSource } from 'typeorm';
import {TipoDocumento} from './entities/tipo-documento.entity';
export const TipoDocumentoProviders = [
  {
    provide: 'TIPODOCUMENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TipoDocumento),
    inject: ['DATA_SOURCE'],
  },
];
