import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  isUsed: boolean;

  @Column()
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user.token, {
    cascade: true,
    eager: true,
  })
  user: User;
}
