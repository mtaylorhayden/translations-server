import { PartialType } from '@nestjs/mapped-types';
import { CreateGuideDto } from './create-guide.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { UpdateSentenceDto } from 'src/sentences/dto/update-sentence.dto';
import { UpdateTranslationDto } from 'src/translations/dto/update-translation.dto';
import { Level } from '../enums/level.enum';

export class UpdateGuideDto extends PartialType(CreateGuideDto) {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  level?: Level;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  examples?: string;

  @IsString()
  @IsOptional()
  subDescription?: string;

  @IsArray()
  @IsOptional()
  sentences?: UpdateSentenceDto[];

  @IsArray()
  @IsOptional()
  translations?: UpdateTranslationDto[];
}
