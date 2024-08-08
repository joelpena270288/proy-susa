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
  import {Edificio} from '../../edificio/entities/edificio.entity';
  @Entity('apartamentos')
export class Apartamento {
    @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'int', nullable: false })
  cantidadHabitaciones: number;
  @ManyToOne(() => Edificio, (edificio) => edificio.apartamentos)
  edificio: Edificio;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
