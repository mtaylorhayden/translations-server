import { Module } from '@nestjs/common';
import { BlankExercisesService } from './blank-exercises.service';
import { BlankExercisesController } from './blank-exercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlankExercise } from './entities/blank-exercise.entity';
import { Workbook } from 'src/workbooks/entities/workbook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlankExercise, Workbook])],
  controllers: [BlankExercisesController],
  providers: [BlankExercisesService],
})
export class BlankExercisesModule {}
