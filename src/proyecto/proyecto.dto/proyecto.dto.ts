/* eslint-disable prettier/prettier */
import {
  isDate,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';
export class ProyectoDto {
  @IsDate()
  @IsNotEmpty()
  readonly fechaInicio: Date;

  @IsDate()
  @IsNotEmpty()
  readonly fechaFinal: Date;

  @IsUrl()
  @IsNotEmpty()
  readonly url: string;
}
