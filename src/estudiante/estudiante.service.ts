import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
  ) {}

  async crearEstudiante(
    estudiante: EstudianteEntity,
  ): Promise<EstudianteEntity> {
    // Validar que el código tenga exactamente 10 caracteres
    if (!estudiante.codigo || estudiante.codigo.length !== 10) {
      throw new BadRequestException(
        'El código del estudiante debe tener exactamente 10 caracteres.',
      );
    }

    // Guardar el estudiante en la base de datos
    return await this.estudianteRepository.save(estudiante);
  }

  async findOne(id: string): Promise<EstudianteEntity> {
    const estudiante: EstudianteEntity =
      await this.estudianteRepository.findOne({
        where: { id },
        relations: ['artworks', 'exhibitions'],
      });
    if (!estudiante)
      throw new BusinessLogicException(
        'The estudiante with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return estudiante;
  }
}
