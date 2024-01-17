import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkbookDto } from './create-workbook.dto';

export class UpdateWorkbookDto extends PartialType(CreateWorkbookDto) {}
