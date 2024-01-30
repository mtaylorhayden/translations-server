import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlankExerciseProgressDto } from './dto/create-blank-exercise-progress.dto';
import { UpdateBlankExerciseProgressDto } from './dto/update-blank-exercise-progress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlankExerciseProgress } from './entities/blank-exercise-progress.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlankExerciseProgressService {
  constructor(
    @InjectRepository(BlankExerciseProgress)
    private blankExerciseProgressRepository: Repository<BlankExerciseProgress>,
  ) {}
  create(createBlankExerciseProgressDto: CreateBlankExerciseProgressDto) {
    return 'This action adds a new blankExerciseProgress';
  }

  findAll() {
    return `This action returns all blankExerciseProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blankExerciseProgress`;
  }

  // we can find the exercise by the progressExcercise ID TODO
  // update the exercise progress status
  async update(
    id: number,
    updateBlankExerciseProgressDto: UpdateBlankExerciseProgressDto,
  ) {
    try {
      const blankExerciseProgress =
        await this.blankExerciseProgressRepository.findOne({
          where: { id: id },
        });
      if (!blankExerciseProgress) {
        throw new HttpException(
          `Could not find blankExerciseProgress with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      // this line should update the status
      Object.assign(blankExerciseProgress, updateBlankExerciseProgressDto);

      const updated = await this.blankExerciseProgressRepository.save(
        blankExerciseProgress,
      );
      console.log('updated blankExerciseProgress', updated);
      return updated;
    } catch (error) {
      console.log(`Error updating blankExerciseProgress ${error.message}`);
      throw new HttpException(
        `Error updating blankExerciseProgress ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return `This action updates a #${id} blankExerciseProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} blankExerciseProgress`;
  }
}
