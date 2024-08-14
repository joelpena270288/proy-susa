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
  @Entity(' plantas-tratamiento') 
export class PlantaTratamiento {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'boolean', nullable: false,default: false })
     valor: boolean;
     @Column({ type: 'decimal', nullable: false,default:0, precision: 10, scale: 2 })
    capacidad: number;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

}
