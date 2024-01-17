import { Module } from '@nestjs/common';
import { WorkbooksService } from './workbooks.service';
import { WorkbooksController } from './workbooks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workbook } from './entities/workbook.entity';
import { Guide } from 'src/guides/entities/guide.entity';
import { BlankExercise } from 'src/blank-exercises/entities/blank-exercise.entity';
import { UserProgress } from 'src/user-progress/entities/user-progress.entity';
import { WorkbookProgress } from 'src/workbook-progress/entities/workbook-progress.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Workbook,
      Guide,
      BlankExercise,
      WorkbookProgress,
    ]),
  ],
  controllers: [WorkbooksController],
  providers: [WorkbooksService],
})
export class WorkbooksModule {}
