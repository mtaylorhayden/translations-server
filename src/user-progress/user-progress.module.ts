import { Module } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { UserProgressController } from './user-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProgress } from './entities/user-progress.entity';
import { BlankExercise } from 'src/blank-exercises/entities/blank-exercise.entity';
import { Workbook } from 'src/workbooks/entities/workbook.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProgress, BlankExercise, Workbook, User]),
  ],
  controllers: [UserProgressController],
  providers: [UserProgressService],
})
export class UserProgressModule {}
