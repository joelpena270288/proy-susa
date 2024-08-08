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
  @Entity('logs') 
export class Log {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    usuario: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    accion: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    entidad: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    mensaje: string;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

}
