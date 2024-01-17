import { BlankExercise } from 'src/blank-exercises/entities/blank-exercise.entity';
import { Guide } from 'src/guides/entities/guide.entity';
import { UserProgress } from 'src/user-progress/entities/user-progress.entity';
import { WorkbookProgress } from 'src/workbook-progress/entities/workbook-progress.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Workbook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isComplete: boolean;

  @ManyToOne(() => Guide, (guide) => guide.workbooks)
  guide: Guide;

  @OneToMany(() => BlankExercise, (blankExercise) => blankExercise.workbook, {
    cascade: true,
  })
  blankExercises: BlankExercise[];

  @OneToMany(
    () => WorkbookProgress,
    (workbookProgress) => workbookProgress.workbook,
  )
  workbookProgress: WorkbookProgress;
}
