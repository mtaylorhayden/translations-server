import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateBlankExerciseDto } from 'src/blank-exercises/dto/create-blank-exercise.dto';

export class CreateWorkbookDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @IsBoolean()
  isComplete: boolean;

  @IsNotEmpty({ message: 'A guide ID is required' })
  @IsNumber()
  guideId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBlankExerciseDto)
  createBlankExerciseDto: CreateBlankExerciseDto[];
}
