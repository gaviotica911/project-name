import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorController } from './profesor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProfesorEntity])],
  providers: [ProfesorService],
  controllers: [ProfesorController],
})
export class ProfesorModule {}
