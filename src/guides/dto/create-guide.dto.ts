import { Optional } from '@nestjs/common';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Level } from '../enums/level.enum';

export class CreateGuideDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  examples: string;

  @IsString()
  @IsOptional()
  subDescription?: string;

  @IsEnum(Level)
  @IsOptional()
  level: string;
}
