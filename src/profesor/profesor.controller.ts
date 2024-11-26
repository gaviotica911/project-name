import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { ProfesorService } from './profesor.service';
import { ProfesorDto } from './profesor.dto/profesor.dto';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { plainToInstance } from 'class-transformer';

@Controller('profesores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}
  @Post()
  async create(@Body() profesorDto: ProfesorDto) {
    const profesor: ProfesorEntity = plainToInstance(
      ProfesorEntity,
      profesorDto,
    );
    return await this.profesorService.crearProfesor(profesor);
  }

  @Get(':profesorId')
  async findOne(@Param('profesorId') profesorId: string) {
    return await this.profesorService.findOne(profesorId);
  }

  @Delete(':profesorId')
  @HttpCode(204)
  async deleteId(@Param('profesorId') profesorId: string) {
    return await this.profesorService.eliminarProfesorId(profesorId);
  }

  @Delete(':profesorCedula')
  @HttpCode(204)
  async deleteCedula(@Param('profesorCedula') profesorCedula: number) {
    return await this.profesorService.eliminarProfesorCedula(profesorCedula);
  }
}
