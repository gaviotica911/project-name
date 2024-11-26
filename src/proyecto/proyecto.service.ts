import { BadRequestException, Injectable } from '@nestjs/common';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,
  ) {}

  async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
    if (proyecto.fechaFinal > proyecto.fechaInicio) {
      throw new BadRequestException('La fecha de inicio debe ser primero');
    }

    return await this.proyectoRepository.save(proyecto);
  }
}
