import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
    BeforeInsert,
  } from 'typeorm';
  import {Proyecto} from '../../proyecto/entities/proyecto.entity';
  import {TipoDocumento} from '../../tipo-documento/entities/tipo-documento.entity';
  @Entity('documentos')
export class Documento {
    @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  dir: string; 
  @ManyToOne(() => Proyecto, (proyecto) => proyecto.documentos)
  proyecto: Proyecto;
  @ManyToOne(() => TipoDocumento, (tipo) => tipo.documentos)
    tipo: TipoDocumento;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

}
