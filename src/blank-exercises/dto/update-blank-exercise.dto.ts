import { PartialType } from '@nestjs/mapped-types';
import { CreateBlankExerciseDto } from './create-blank-exercise.dto';

export class UpdateBlankExerciseDto extends PartialType(CreateBlankExerciseDto) {}
