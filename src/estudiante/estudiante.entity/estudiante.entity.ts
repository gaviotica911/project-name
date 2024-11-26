import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class EstudianteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nombre: string;
  @Column()
  codigo: string;
  @Column()
  numCreditosAprobados: number;

  @OneToOne(() => ProyectoEntity, (proyecto) => proyecto.estudiante)
  @JoinColumn()
  proyecto: ProyectoEntity;
}
