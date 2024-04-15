import { Sentence } from 'src/sentences/entities/sentence.entity';
import { Translation } from 'src/translations/entities/translation.entity';
import { Level } from '../enums/level.enum';
import { Workbook } from 'src/workbooks/entities/workbook.entity';

export class GetGuideDto {
  id: number;
  level: Level;
  title: string;
  description: string;
  subDescription: string;
  examples: string;
  sentences: Sentence[];
  translations: Translation[];
  workbooks: Workbook[];
}
