import { Sentence } from 'src/sentences/entities/sentence.entity';
import { Translation } from 'src/translations/entities/translation.entity';

export class GetGuideDto {
  id: number;
  title: string;
  description: string;
  subDescription: string;
  examples: string;
  sentences: Sentence[];
  translations: Translation[];
}
