import { Guide } from 'src/guides/entities/guide.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
