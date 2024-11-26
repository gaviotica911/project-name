import { Col } from 'react-bootstrap';
import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class PropuestaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  titulo: string;
  @Column()
  descripcion: string;
  @Column()
  palabraClave: string;

  @OneToOne(() => ProyectoEntity, (proyecto) => proyecto.propuesta)
  proyecto: ProyectoEntity;

  @ManyToOne(() => ProfesorEntity, (profesor) => profesor.propuestas)
  profesor: ProfesorEntity;
}
