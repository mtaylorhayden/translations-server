import { Module } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { UserProgressController } from './user-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProgress } from './entities/user-progress.entity';
import { User } from 'src/user/entities/user.entity';
import { WorkbookProgress } from 'src/workbook-progress/entities/workbook-progress.entity';
import { BlankExerciseProgress } from 'src/blank-exercise-progress/entities/blank-exercise-progress.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserProgress,
      BlankExerciseProgress,
      WorkbookProgress,
      User,
    ]),
  ],
  controllers: [UserProgressController],
  providers: [UserProgressService],
})
export class UserProgressModule {}
