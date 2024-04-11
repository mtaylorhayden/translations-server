import { Status } from 'src/blank-exercise-progress/enums/status.enum';
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
export class WorkbookProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NOT_STARTED,
  })
  status: Status;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  percentageFinished: number;

  // one workbookProgress can belong to many userProgress
  @OneToMany(
    () => UserProgress,
    (userProgress) => userProgress.workbookProgress,
  )
  userProgress: UserProgress;

  // One workbook can belong to many workbookProgress
  @ManyToOne(() => Workbook, (workbook) => workbook.workbookProgress, {
    eager: true,
    onDelete: 'CASCADE',
  })
  workbook: Workbook;
}
