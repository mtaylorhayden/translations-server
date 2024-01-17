import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkbookProgressDto } from './create-workbook-progress.dto';

export class UpdateWorkbookProgressDto extends PartialType(CreateWorkbookProgressDto) {}
