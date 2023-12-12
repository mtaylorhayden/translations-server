import { Guide } from 'src/guides/entities/guide.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sentence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  aSide: string;

  @Column()
  bSide: string;

  @ManyToOne(() => Guide, (guide) => guide.sentences, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  guide: Guide;
}
