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
  @Entity('documentos')
export class Documento {
    @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  name: string; 
  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  dir: string; 
  @ManyToOne(() => Proyecto, (proyecto) => proyecto.documentos)
  proyecto: Proyecto;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

}
