import { Sentence } from 'src/sentences/entities/sentence.entity';
import { Translation } from 'src/translations/entities/translation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Guide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
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
  })
  translations: Translation[];

  @OneToMany(() => Sentence, (sentence) => sentence.guide, { cascade: true })
  sentences: Sentence[];
}
