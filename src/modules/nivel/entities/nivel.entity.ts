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
  import {Parqueo} from '../../parqueo/entities/parqueo.entity';
  import {Edificio} from '../../edificio/entities/edificio.entity';
  @Entity(' niveles') 
export class Nivel {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100,unique: true, nullable: false })
    name: string;
    @OneToMany(() => Parqueo, (parqueo) => parqueo.nivel)
    parqueos: Parqueo[];
    @OneToMany(() => Edificio, (edificio) => edificio.nivel)
    edificio: Edificio[];
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

}
