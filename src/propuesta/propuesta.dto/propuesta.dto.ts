/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class PropuestaDto {
  @IsString()
  @IsNotEmpty()
  readonly titulo: string;

  @IsNumber()
  @IsNotEmpty()
  readonly descripcion: number;

  @IsNumber()
  @IsNotEmpty()
  readonly palabraClave: number;
}
