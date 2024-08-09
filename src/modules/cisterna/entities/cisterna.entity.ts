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
  @Entity(' cisternas') 
export class Cisterna {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'boolean', nullable: false,default: true })
    valor: boolean;
    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    capacidad: number;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
