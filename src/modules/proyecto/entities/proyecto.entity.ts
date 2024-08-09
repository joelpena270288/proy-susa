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
  import {Cliente} from '../../cliente/entities/cliente.entity';
  import {Ubicacion} from '../../ubicacion/entities/ubicacion.entity';
  import {Titulo} from '../../titulo/entities/titulo.entity';
  import {Contrato} from '../../contrato/entities/contrato.entity';
  import {Parqueo} from '../../parqueo/entities/parqueo.entity';
  import {Documento} from '../../documentos/entities/documento.entity';
  import {Status} from '../../../EntityStatus/entity.estatus.enum';
  import {Edificio} from '../../edificio/entities/edificio.entity';
  import {Cisterna} from '../../cisterna/entities/cisterna.entity';
  import {PlantaTratamiento} from '../../planta-tratamiento/entities/planta-tratamiento.entity';
  import {Apartamento} from '../../apartamento/entities/apartamento.entity';
  @Entity('proyectos')
export class Proyecto {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', nullable: false })
    name: string;
    @ManyToOne(() => Cliente, (cliente) => cliente.proyectos)
    cliente: Cliente;
    @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.proyectos)
    ubicacion: Ubicacion;
    @Column({ type: 'varchar', nullable: false })
    referencia: string;
    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    terreno: number;
    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    construccion: number;
    @OneToMany(() => Titulo, (titulo) => titulo.proyecto)
    titulos: Titulo[];
    @OneToMany(() => Contrato, (contrato) => contrato.proyecto)
    contratos: Contrato[];
    @OneToOne(() => Edificio)
    @JoinColumn()
    edificio: Edificio;
    @OneToMany(() => Apartamento, (apartamento) => apartamento.proyecto,{eager: true, cascade: true})
    apartamentos: Apartamento[];
    @OneToOne(() => Parqueo)
    @JoinColumn()
    parqueo: Parqueo;
    @OneToOne(() => Cisterna)
    @JoinColumn()
    cisterna: Cisterna;
    @OneToOne(() => PlantaTratamiento)
    @JoinColumn()
    planta: PlantaTratamiento;
    @OneToMany(() => Documento, (documento) => documento.proyecto)
    documentos: Documento[];
    @Column({ type: 'varchar', length: 25, nullable: false,default: Status.ACTIVO })
    status: string; 
    @Column({ type: 'varchar', nullable: true,default: Status.ACTIVO })
    nota: string; 
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date; 



}
