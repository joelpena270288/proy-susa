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
  @Column("text") // Use "bytea" for BLOBs in PostgreSQL
  file_name: string;
  @Column({ type: 'bytea', unique: true, nullable: false })
  dir: Buffer; 
  @ManyToOne(() => Proyecto, (proyecto) => proyecto.documentos)
  proyecto: Proyecto;
  
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

}
