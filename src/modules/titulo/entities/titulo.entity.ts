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
  @Entity('titulos') 
export class Titulo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', nullable: false })
    name: string;    
    @Column({ type: 'varchar', nullable: false })
    matricula: string;  
    @Column({ type: 'varchar', nullable: false })
    designacion: string;  
    @ManyToOne(() => Proyecto, (proyecto) => proyecto.titulos)
    proyecto: Proyecto;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
