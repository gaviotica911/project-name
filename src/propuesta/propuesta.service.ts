import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class PropuestaService {
  constructor(
    @InjectRepository(PropuestaEntity)
    private readonly propuestaRepository: Repository<PropuestaEntity>,
  ) {}

  async crearPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
    // Validar que el título no sea vacío
    if (!propuesta.titulo || propuesta.titulo.trim() === '') {
      throw new BadRequestException(
        'El título de la propuesta no puede estar vacío.',
      );
    }

    // Guardar la propuesta en la base de datos
    return await this.propuestaRepository.save(propuesta);
  }

  async findOne(id: string): Promise<PropuestaEntity> {
    const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({
      where: { id },
      relations: ['proyecto', 'profesor'],
    });
    if (!propuesta)
      throw new BusinessLogicException(
        'The propuesta with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return propuesta;
  }

  async findAll(): Promise<PropuestaEntity[]> {
    return await this.propuestaRepository.find({
      relations: ['proyecto', 'profesor'],
    });
  }

  async deletePropuesta(id: string): Promise<void> {
    // Buscar la propuesta con el proyecto asociado (si existe)
    const propuesta = await this.propuestaRepository.findOne({
      where: { id },
      relations: ['proyecto', 'profesor'],
    });

    // Verificar si la propuesta existe
    if (!propuesta) {
      throw new NotFoundException(`La propuesta  no fue encontrada.`);
    }

    // Validar si la propuesta tiene un proyecto asociado
    if (propuesta.proyecto) {
      throw new BadRequestException(
        `La propuesta no puede ser eliminada porque está asociada a un proyecto.`,
      );
    }

    // Eliminar la propuesta si no tiene un proyecto asociado
    await this.propuestaRepository.remove(propuesta);
  }
}
