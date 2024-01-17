import { Module } from '@nestjs/common';
import { WorkbookProgressService } from './workbook-progress.service';
import { WorkbookProgressController } from './workbook-progress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkbookProgress } from './entities/workbook-progress.entity';
import { UserProgress } from 'src/user-progress/entities/user-progress.entity';
import { Workbook } from 'src/workbooks/entities/workbook.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkbookProgress, UserProgress, Workbook]),
  ],
  controllers: [WorkbookProgressController],
  providers: [WorkbookProgressService],
})
export class WorkbookProgressModule {}
