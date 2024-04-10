import { BlankExerciseProgress } from 'src/blank-exercise-progress/entities/blank-exercise-progress.entity';
import { Status } from 'src/blank-exercise-progress/enums/status.enum';
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

  @Column({ default: 0 }) // we can use progressdate, see if progressDate was yesterday => +1
  streak: number;

  // each userProgress can track many workbookProgress
  @JoinColumn()
  @ManyToOne(
    () => WorkbookProgress,
    (workbookProgress) => workbookProgress.userProgress,
  )
  workbookProgress: WorkbookProgress;

  // each userProgress can track many blankExerciseProgress
  @JoinColumn()
  @ManyToOne(
    () => BlankExerciseProgress,
    (blankExerciseProgress) => blankExerciseProgress.userProgress,
  )
  blankExerciseProgress: BlankExerciseProgress;

  // many userProgresses can belong to one user
  // a user can have multiple progresses,
  @ManyToOne(() => User, (user) => user.userProgress)
  @JoinColumn()
  user: User;
}
