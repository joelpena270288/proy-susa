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
@Entity('edificios')
export class Edificio {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'boolean', nullable: false,default: false })
  valor: boolean;
  @Column({ type: 'int', nullable: false })
  cantidad: number;
  @Column({ type: 'int', nullable: false })
  niveles: number; 
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;


}
