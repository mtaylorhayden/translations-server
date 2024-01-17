import { Injectable } from '@nestjs/common';
import { CreateBlankExerciseProgressDto } from './dto/create-blank-exercise-progress.dto';
import { UpdateBlankExerciseProgressDto } from './dto/update-blank-exercise-progress.dto';

@Injectable()
export class BlankExerciseProgressService {
  create(createBlankExerciseProgressDto: CreateBlankExerciseProgressDto) {
    return 'This action adds a new blankExerciseProgress';
  }

  findAll() {
    return `This action returns all blankExerciseProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blankExerciseProgress`;
  }

  update(id: number, updateBlankExerciseProgressDto: UpdateBlankExerciseProgressDto) {
    return `This action updates a #${id} blankExerciseProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} blankExerciseProgress`;
  }
}
