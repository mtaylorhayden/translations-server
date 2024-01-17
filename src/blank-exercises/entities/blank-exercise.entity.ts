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

  @Column({ default: false })
  isComplete: boolean;

  @ManyToOne(() => Workbook, (workbook) => workbook.blankExercises)
  workbook: Workbook[];

  @OneToMany(() => UserProgress, (userProgress) => userProgress.blankExercise)
  userProgress: UserProgress;
}
