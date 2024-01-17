import { BlankExercise } from 'src/blank-exercises/entities/blank-exercise.entity';
import { User } from 'src/user/entities/user.entity';
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

  @ManyToOne(() => Workbook, (workbook) => workbook.userProgress)
  workbook: Workbook[];

  @ManyToOne(() => BlankExercise, (blankExercise) => blankExercise.userProgress)
  blankExercise: BlankExercise[];

  @OneToOne(() => User, (user) => user.userProgress)
  @JoinColumn()
  user: User;
}
