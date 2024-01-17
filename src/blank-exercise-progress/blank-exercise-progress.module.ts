import { Module } from '@nestjs/common';
import { BlankExerciseProgressService } from './blank-exercise-progress.service';
import { BlankExerciseProgressController } from './blank-exercise-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlankExercise } from 'src/blank-exercises/entities/blank-exercise.entity';
import { UserProgress } from 'src/user-progress/entities/user-progress.entity';
import { BlankExerciseProgress } from './entities/blank-exercise-progress.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BlankExercise,
      UserProgress,
      BlankExerciseProgress,
    ]),
  ],
  controllers: [BlankExerciseProgressController],
  providers: [BlankExerciseProgressService],
})
export class BlankExerciseProgressModule {}
