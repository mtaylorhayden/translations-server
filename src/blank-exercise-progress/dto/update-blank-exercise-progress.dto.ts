import { PartialType } from '@nestjs/mapped-types';
import { CreateBlankExerciseProgressDto } from './create-blank-exercise-progress.dto';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Status } from '../status-enum/status.enum';

export class UpdateBlankExerciseProgressDto extends PartialType(
  CreateBlankExerciseProgressDto,
) {
  @IsEnum(Status)
  status: string;
}
