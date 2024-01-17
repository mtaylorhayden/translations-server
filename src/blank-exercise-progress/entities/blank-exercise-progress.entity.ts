import { BlankExercise } from 'src/blank-exercises/entities/blank-exercise.entity';
import { UserProgress } from 'src/user-progress/entities/user-progress.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BlankExerciseProgress {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(
    () => BlankExercise,
    (blankExercise) => blankExercise.blankExerciseProgress,
  )
  blankExercises: BlankExercise;

  @OneToMany(
    () => UserProgress,
    (userProgress) => userProgress.blankExerciseProgress,
  )
  userProgress: UserProgress;
}
