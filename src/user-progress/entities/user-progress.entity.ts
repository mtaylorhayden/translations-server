import { BlankExerciseProgress } from 'src/blank-exercise-progress/entities/blank-exercise-progress.entity';
import { BlankExercise } from 'src/blank-exercises/entities/blank-exercise.entity';
import { User } from 'src/user/entities/user.entity';
import { WorkbookProgress } from 'src/workbook-progress/entities/workbook-progress.entity';
import { Workbook } from 'src/workbooks/entities/workbook.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  progressDate: Date;

  @Column() // todo, make enum for
  status: string;

  @ManyToOne(
    () => WorkbookProgress,
    (workbookProgress) => workbookProgress.userProgress,
  )
  workbookProgress: WorkbookProgress;

  @ManyToOne(
    () => BlankExerciseProgress,
    (blankExerciseProgress) => blankExerciseProgress.userProgress,
  )
  blankExerciseProgress: BlankExerciseProgress[];

  @OneToOne(() => User, (user) => user.userProgress)
  @JoinColumn()
  user: User;
}
