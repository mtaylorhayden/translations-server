import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGuideWithTranslationDto {
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
  subDescription: string;

  @IsNotEmpty()
  @IsString()
  guideId: string;
}
