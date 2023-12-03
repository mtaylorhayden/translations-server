import { IsString, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';

export class CreateTranslationDto {
  @IsString()
  @IsNotEmpty()
  translations: string;
}
