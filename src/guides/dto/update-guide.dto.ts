import { PartialType } from '@nestjs/mapped-types';
import { CreateGuideDto } from './create-guide.dto';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Translation } from 'src/translations/entities/translation.entity';
import { Sentence } from 'src/sentences/entities/sentence.entity';
import { UpdateSentenceDto } from 'src/sentences/dto/update-sentence.dto';
import { UpdateTranslationDto } from 'src/translations/dto/update-translation.dto';

export class UpdateGuideDto extends PartialType(CreateGuideDto) {
  @IsString()
  @IsOptional()
  title?: string;

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
