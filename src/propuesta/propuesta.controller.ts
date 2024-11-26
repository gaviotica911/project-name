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

import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { PropuestaDto } from './propuesta.dto/propuesta.dto';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { PropuestaService } from './propuesta.service';
@Controller('propuestas')
@UseInterceptors(BusinessErrorsInterceptor)
export class PropuestaController {
  constructor(private readonly propuestaService: PropuestaService) {}

  @Get()
  async findAll() {
    return await this.propuestaService.findAll();
  }

  @Post()
  async create(@Body() propuestaDto: PropuestaDto) {
    const propuesta: PropuestaEntity = plainToInstance(
      PropuestaEntity,
      propuestaDto,
    );
    return await this.propuestaService.crearPropuesta(propuesta);
  }

  @Get(':propuestaId')
  async findOne(@Param('propuestaId') propuestaId: string) {
    return await this.propuestaService.findOne(propuestaId);
  }

  @Delete(':propuestaId')
  @HttpCode(204)
  async delete(@Param('propuestaId') propuestaId: string) {
    return await this.propuestaService.deletePropuesta(propuestaId);
  }
}
