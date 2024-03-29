import { BlankExerciseProgress } from 'src/blank-exercise-progress/entities/blank-exercise-progress.entity';
import { UserProgress } from 'src/user-progress/entities/user-progress.entity';
import { Workbook } from 'src/workbooks/entities/workbook.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BlankExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exercise: string;

  @Column()
  exerciseAnswer: string;

  @Column({ default: false })
  isComplete: boolean;

  // One blankExercise can belong to many blankExerciseProgress
  @OneToMany(
    () => BlankExerciseProgress,
    (blankExerciseProgress) => blankExerciseProgress.blankExercise,
    { cascade: true },
  )
  blankExerciseProgress: BlankExerciseProgress[];

  @ManyToOne(() => Workbook, (workbook) => workbook.blankExercises)
  workbook: Workbook[];
}
