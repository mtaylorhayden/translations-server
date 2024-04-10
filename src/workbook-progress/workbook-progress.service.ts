import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkbookProgressDto } from './dto/create-workbook-progress.dto';
import { UpdateWorkbookProgressDto } from './dto/update-workbook-progress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkbookProgress } from './entities/workbook-progress.entity';
import { Repository } from 'typeorm';
import { Status } from 'src/blank-exercise-progress/enums/status.enum';
import { BlankExercise } from 'src/blank-exercises/entities/blank-exercise.entity';

@Injectable()
export class WorkbookProgressService {
  constructor(
    @InjectRepository(WorkbookProgress)
    private workbookProgressRepository: Repository<WorkbookProgress>,
  ) {}
  create(createWorkbookProgressDto: CreateWorkbookProgressDto) {
    return 'This action adds a new workbookProgress';
  }

  findAll() {
    return `This action returns all workbookProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workbookProgress`;
  }

  async update(
    id: number,
    updateWorkbookProgressDto: UpdateWorkbookProgressDto,
  ) {
    try {
      const workbookProgress = await this.workbookProgressRepository.findOne({
        where: { id: id },
      });
      if (!workbookProgress) {
        throw new HttpException(
          `Could not find workbookProgress with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      // update percentage completed:
      if (updateWorkbookProgressDto.status === 'COMPLETED') {
        workbookProgress.percentageFinished = 100;
      } else {
        workbookProgress.percentageFinished = this.calculatePercentage(
          updateWorkbookProgressDto.status,
          workbookProgress.workbook.blankExercises,
        );
      }

      Object.assign(workbookProgress, updateWorkbookProgressDto);

      return await this.workbookProgressRepository.save(workbookProgress);
    } catch (error) {
      console.log(`Error updating blankExerciseProgress ${error.message}`);
      throw new HttpException(
        `Error updating blankExerciseProgress ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  calculatePercentage(status: Status, blankExercises: BlankExercise[]): number {
    // we need to know how many exercises that belong to the workbook
    // so we need to get the workbook
    const totalBlankExercises = blankExercises.length;
    let completedBlankExercises = 0;
    try {
      blankExercises.forEach((blankExercise) => {
        if (blankExercise.isComplete) {
          completedBlankExercises++;
        }
      });
      return (completedBlankExercises / totalBlankExercises) * 100;
    } catch (error) {
      console.log('Error calculating percentage', error.message);
      throw new Error('Error calculating percentage');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} workbookProgress`;
  }
}
