import { BlankExercise } from 'src/blank-exercises/entities/blank-exercise.entity';
import { UserProgress } from 'src/user-progress/entities/user-progress.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../status-enum/status.enum';

@Entity()
export class BlankExerciseProgress {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NOT_STARTED,
  })
  status: Status;

  // One blankExercise can belong to many blankExerciseProgress
  @ManyToOne(
    () => BlankExercise,
    (blankExercise) => blankExercise.blankExerciseProgress,
  )
  blankExercise: BlankExercise;

  // One ExerciseProgress can belong to many UserProgress
  @OneToMany(
    () => UserProgress,
    (userProgress) => userProgress.blankExerciseProgress,
    { cascade: true },
  )
  userProgress: UserProgress[];
}
