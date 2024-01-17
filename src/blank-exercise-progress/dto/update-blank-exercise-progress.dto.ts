import { PartialType } from '@nestjs/mapped-types';
import { CreateBlankExerciseProgressDto } from './create-blank-exercise-progress.dto';

export class UpdateBlankExerciseProgressDto extends PartialType(CreateBlankExerciseProgressDto) {}
