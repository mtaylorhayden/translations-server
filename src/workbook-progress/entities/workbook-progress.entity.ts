import { UserProgress } from 'src/user-progress/entities/user-progress.entity';
import { Workbook } from 'src/workbooks/entities/workbook.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkbookProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => UserProgress,
    (userProgress) => userProgress.workbookProgress,
  )
  userProgress: UserProgress;

  @ManyToOne(() => Workbook, (workbook) => workbook.workbookProgress)
  workbook: Workbook[];
}
