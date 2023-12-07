import { Guide } from 'src/guides/entities/guide.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sentence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  english: string;

  @Column()
  turkish: string;

  @ManyToOne(() => Guide, (guide) => guide.sentences)
  guide: Guide;
}
