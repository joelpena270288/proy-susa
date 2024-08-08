
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
  import {Status} from '../../../EntityStatus/entity.estatus.enum';
  import {Documento} from '../../documentos/entities/documento.entity';
  @Entity('tipos_documentos')
export class TipoDocumento {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 250, nullable: false })
    nombre: string;
    @OneToMany(() => Documento, (documento) => documento.tipo)
    documentos: Documento[];
    @Column({ type: 'varchar', length: 25, nullable: false,default: Status.ACTIVO })
    status: string; 
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
