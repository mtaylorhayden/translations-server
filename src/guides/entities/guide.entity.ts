import { Sentence } from 'src/sentences/entities/sentence.entity';
import { Translation } from 'src/translations/entities/translation.entity';
import { Workbook } from 'src/workbooks/entities/workbook.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Level } from '../enums/level.enum';

@Entity()
export class Guide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: Level;

  @Column()
  title: string;

  @Column('longtext')
  description: string;

  @Column('longtext', { nullable: true })
  subDescription: string;

  @Column()
  examples: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Translation, (translation) => translation.guide, {
    cascade: true,
    eager: true,
  })
  translations: Translation[];

  @OneToMany(() => Sentence, (sentence) => sentence.guide, {
    cascade: true,
    eager: true,
  })
  sentences: Sentence[];

  @OneToMany(() => Workbook, (workbook) => workbook.guide)
  workbooks: Workbook[];
}
