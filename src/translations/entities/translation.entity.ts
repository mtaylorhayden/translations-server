import { Guide } from 'src/guides/entities/guide.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  englishWord: string;

  @Column()
  turkishInfinitive: string;

  @Column()
  turkishConjugated: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Guide, (guide) => guide.translations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  guide: Guide;
}
