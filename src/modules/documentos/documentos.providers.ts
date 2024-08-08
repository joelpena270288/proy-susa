import { DataSource } from 'typeorm';
import { Documento } from './entities/documento.entity';
export const DocumentoProviders = [
  {
    provide: 'DOCUMENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Documento),
    inject: ['DATA_SOURCE'],
  },
];
