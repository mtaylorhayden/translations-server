import { Workbook } from 'src/workbooks/entities/workbook.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlankExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exercise: string;

  @Column({ default: false })
  isComplete: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  progressDate: Date;

  @ManyToOne(() => Workbook, (workbook) => workbook.blankExercises)
  workbook: Workbook[];
}
