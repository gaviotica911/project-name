import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';
import {
  Column,
  Double,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class ProfesorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numeroCedula: number;

  @Column()
  nombre: string;
  @Column()
  grupoDeInvestigacion: string;

  @Column()
  numeroExtension: number;
  @OneToMany(() => PropuestaEntity, (propuesta) => propuesta.profesor)
  propuestas: PropuestaEntity[];
}
