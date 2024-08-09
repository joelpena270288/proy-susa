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
  @Entity('apartamentos')
export class Apartamento {
    @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'int', nullable: false })
  cantidadHabitaciones: number;
  @Column({ type: 'int', nullable: false })
  cantidadAptos: number;
  @ManyToOne(() => Proyecto, (proyecto) => proyecto.apartamentos)
  proyecto: Proyecto;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
