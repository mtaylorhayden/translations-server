import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
