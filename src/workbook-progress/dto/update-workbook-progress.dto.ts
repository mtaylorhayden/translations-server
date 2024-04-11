import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkbookProgressDto } from './create-workbook-progress.dto';
import { IsEnum } from 'class-validator';
import { Status } from 'src/blank-exercise-progress/enums/status.enum';

export class UpdateWorkbookProgressDto extends PartialType(
  CreateWorkbookProgressDto,
) {
  @IsEnum(Status)
  status: Status;
}
