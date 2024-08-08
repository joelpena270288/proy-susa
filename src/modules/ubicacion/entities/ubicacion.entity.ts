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
  import {Status} from '../../../EntityStatus/entity.estatus.enum';
  @Entity('ubicaciones') 
export class Ubicacion {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', nullable: false })
    name: string;
    @OneToMany(() => Proyecto, (proyecto) => proyecto.ubicacion)
    proyectos: Proyecto[];
    @Column({ type: 'varchar', length: 25, nullable: false,default: Status.ACTIVO })
    status: string; 
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;    
}
