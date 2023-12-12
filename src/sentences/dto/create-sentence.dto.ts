import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSentenceDto {
  @IsString()
  @IsNotEmpty()
  aSide: string;

  @IsString()
  @IsNotEmpty()
  bSide: string;
}
