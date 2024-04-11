import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Status } from 'src/blank-exercise-progress/enums/status.enum';

export class CreateWorkbookProgressDto {
  @IsEnum(Status, {
    message:
      'Status must be a valid enum (NOT_STARTED, IN_PROGRESS, COMPLETED, CANCELLED)',
  })
  status: Status;

  @IsString()
  @IsNotEmpty({ message: 'WorkbookId must not be empty' })
  workbookId: string;
}
