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
import {Nivel} from '../../nivel/entities/nivel.entity';
import {Apartamento} from '../../apartamento/entities/apartamento.entity';

@Entity('edificios')
export class Edificio {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'int', nullable: false })
  cantidad: number;
  @Column({ type: 'int', nullable: false })
  niveles: number; 
  @Column({ type: 'int', nullable: false })
  totalAptos: number;
  @ManyToOne(() => Nivel, (nivel) => nivel.parqueos)
  nivel: Nivel;
  @OneToMany(() => Apartamento, (apartamento) => apartamento.edificio)
  apartamentos: Apartamento[];
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;


}
