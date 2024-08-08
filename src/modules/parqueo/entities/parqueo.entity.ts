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
  import {Cisterna} from '../../cisterna/entities/cisterna.entity';
  import {PlantaTratamiento} from '../../planta-tratamiento/entities/planta-tratamiento.entity';
  import {Nivel} from '../../nivel/entities/nivel.entity';
  @Entity('parqueos') 
export class Parqueo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'boolean',  nullable: false })
    sotano: boolean;
    @Column({ type: 'boolean',  nullable: false })
    pozos: boolean;
    @Column({ type: 'boolean',  nullable: false })
    electricidad: boolean;
    @OneToOne(() => Cisterna)
    @JoinColumn()
    cisterna: Cisterna;
    @OneToOne(() => PlantaTratamiento)
    @JoinColumn()
    planta: PlantaTratamiento;
    @ManyToOne(() => Nivel, (nivel) => nivel.parqueos)
    nivel: Nivel;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

}
