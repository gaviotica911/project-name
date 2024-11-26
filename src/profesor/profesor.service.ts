import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepository: Repository<ProfesorEntity>,
  ) {}

  async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
    const gruposValidos = ['TICSW', 'IMAGINE', 'COMIT'];

    // Validar que el grupo de investigación sea válido
    if (!gruposValidos.includes(profesor.grupoDeInvestigacion)) {
      throw new BadRequestException(
        `El grupo de investigación debe ser uno de los siguientes: ${gruposValidos.join(', ')}`,
      );
    }

    // Guardar en la base de datos
    return await this.profesorRepository.save(profesor);
  }

  async findOne(id: string): Promise<ProfesorEntity> {
    const profesor: ProfesorEntity = await this.profesorRepository.findOne({
      where: { id },
      relations: ['propuestas'],
    });
    if (!profesor)
      throw new BusinessLogicException(
        'The profesor with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return profesor;
  }

  async eliminarProfesorId(id: string): Promise<void> {
    // Buscar al profesor con las propuestas asociadas
    const profesor = await this.profesorRepository.findOne({
      where: { id },
      relations: ['propuestas', 'propuestas.proyecto'], // Cargar propuestas y sus proyectos asociados
    });

    // Validar si el profesor existe
    if (!profesor) {
      throw new NotFoundException(`El profesor no fue encontrado.`);
    }

    // Verificar si alguna propuesta tiene un proyecto asociado
    const tienePropuestasConProyecto = profesor.propuestas.some(
      (propuesta) => propuesta.proyecto !== null,
    );

    if (tienePropuestasConProyecto) {
      throw new BadRequestException(
        `El profesor no puede ser eliminado porque tiene propuestas asociadas a proyectos.`,
      );
    }

    // Eliminar el profesor si pasa las validaciones
    await this.profesorRepository.remove(profesor);
  }

  async eliminarProfesorCedula(numeroCedula: number): Promise<void> {
    // Buscar al profesor con las propuestas asociadas
    const profesor = await this.profesorRepository.findOne({
      where: { numeroCedula },
      relations: ['propuestas', 'propuestas.proyecto'], // Cargar propuestas y sus proyectos asociados
    });

    // Validar si el profesor existe
    if (!profesor) {
      throw new NotFoundException(`El profesor  no fue encontrado.`);
    }

    // Verificar si alguna propuesta tiene un proyecto asociado
    const tienePropuestasConProyecto = profesor.propuestas.some(
      (propuesta) => propuesta.proyecto !== null,
    );

    if (tienePropuestasConProyecto) {
      throw new BadRequestException(
        `El profesor no puede ser eliminado porque tiene propuestas asociadas a proyectos.`,
      );
    }

    // Eliminar el profesor si pasa las validaciones
    await this.profesorRepository.remove(profesor);
  }
}
