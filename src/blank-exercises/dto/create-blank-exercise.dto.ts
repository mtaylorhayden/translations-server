import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlankExerciseDto {
  @IsNotEmpty({ message: 'Exercise cannot be empty' })
  @IsString()
  exercise: string;

  @IsNotEmpty({ message: 'Exercise answer cannot be empty' })
  @IsString()
  exerciseAnswer: string;
}
