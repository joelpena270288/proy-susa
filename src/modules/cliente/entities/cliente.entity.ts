
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
  @Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 250, nullable: false })
    nombre: string;
    @Column({ type: 'varchar', length: 250, nullable: true })
    nombrecontacto: string;
    @Column({ type: 'varchar', length: 250, nullable: true })
    email: string;
    @Column({ type: 'varchar', length: 250, nullable: true })
    direccion: string;
    @Column({ type: 'varchar',length: 16, nullable: true })
    telefono: string;    
    @Column({ type: 'varchar' ,length: 25,unique: true, nullable: false })
    rcn: string; 
    @OneToMany(() => Proyecto, (proyecto) => proyecto.cliente)
    proyectos: Proyecto[];
    @Column({ type: 'varchar', length: 25, nullable: false,default: Status.ACTIVO })
    status: string; 
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
