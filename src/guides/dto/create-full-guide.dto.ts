import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Sentence } from 'src/sentences/entities/sentence.entity';
import { Translation } from 'src/translations/entities/translation.entity';

export class CreateFullGuideDto {
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

  @IsNotEmpty()
  sentences: Sentence[];

  @IsNotEmpty()
  translations: Translation[];
}
