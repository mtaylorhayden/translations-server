import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Sentence } from 'src/sentences/entities/sentence.entity';
import { Translation } from 'src/translations/entities/translation.entity';
import { Level } from '../enums/level.enum';

export class CreateFullGuideDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Level, {
    message: 'Level must be a valid enum (A1, A2, B1, B2, C1)',
  })
  @IsNotEmpty()
  level: Level;

  @IsString()
  @IsNotEmpty()
  examples: string;

  @IsString()
  @IsOptional()
  subDescription?: string;

  @IsNotEmpty()
  sentences: Sentence[];

  @IsNotEmpty()
  translations: Translation[];
}
