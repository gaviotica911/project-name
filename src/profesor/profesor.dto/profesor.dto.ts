/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class ProfesorDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsNumber()
  @IsNotEmpty()
  readonly numeroCedula: number;

  @IsNumber()
  @IsNotEmpty()
  readonly grupoDeInvestigacion: number;

  @IsNumber()
  @IsNotEmpty()
  readonly numeroExtension: number;
}
