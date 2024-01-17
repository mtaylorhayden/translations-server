import { Injectable } from '@nestjs/common';
import { CreateBlankExerciseDto } from './dto/create-blank-exercise.dto';
import { UpdateBlankExerciseDto } from './dto/update-blank-exercise.dto';

@Injectable()
export class BlankExercisesService {
  create(createBlankExerciseDto: CreateBlankExerciseDto) {
    return 'This action adds a new blankExercise';
  }

  findAll() {
    return `This action returns all blankExercises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blankExercise`;
  }

  update(id: number, updateBlankExerciseDto: UpdateBlankExerciseDto) {
    return `This action updates a #${id} blankExercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} blankExercise`;
  }
}
