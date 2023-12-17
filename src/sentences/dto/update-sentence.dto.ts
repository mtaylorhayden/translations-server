import { PartialType } from '@nestjs/mapped-types';
import { CreateSentenceDto } from './create-sentence.dto';

export class UpdateSentenceDto extends PartialType(CreateSentenceDto) {
  aSide?: string;
  bSide?: string;
}
