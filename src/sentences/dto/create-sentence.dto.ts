import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSentenceDto {
  @IsString()
  @IsNotEmpty()
  english: string;

  @IsString()
  @IsNotEmpty()
  turkish: string;
}
