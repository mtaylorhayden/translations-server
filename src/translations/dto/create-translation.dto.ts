import { IsString, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';

export class CreateTranslationDto {
  @IsString()
  @IsNotEmpty()
  englishWord: string;

  @IsString()
  @IsNotEmpty()
  turkishInfinitive: string;

  @IsString()
  @IsNotEmpty()
  turkishConjugated: string;
}
