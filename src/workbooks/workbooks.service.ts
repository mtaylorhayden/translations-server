import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkbookDto } from './dto/create-workbook.dto';
import { UpdateWorkbookDto } from './dto/update-workbook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workbook } from './entities/workbook.entity';
import { EntityManager, Repository } from 'typeorm';
import { Guide } from 'src/guides/entities/guide.entity';
import { BlankExercise } from 'src/blank-exercises/entities/blank-exercise.entity';

@Injectable()
export class WorkbooksService {
  constructor(
    private entityManager: EntityManager,
    @InjectRepository(Workbook)
    private workbookRepository: Repository<Workbook>,
    @InjectRepository(Guide)
    private guideRepository: Repository<Guide>,
  ) {}

  async create(createWorkbookDto: CreateWorkbookDto) {
    try {
      return await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          const guide = await transactionalEntityManager.findOne(Guide, {
            where: { id: createWorkbookDto.guideId },
          });
          if (!guide) {
            throw new HttpException(
              `Could not find guide with id: ${createWorkbookDto.guideId}`,
              HttpStatus.NOT_FOUND,
            );
          }
          let workbook = new Workbook();
          Object.assign(workbook, createWorkbookDto);
          workbook.guide = guide;

          workbook.blankExercises =
            createWorkbookDto.createBlankExerciseDto.map((newBlankExercise) => {
              const blankExercise = new BlankExercise();
              Object.assign(blankExercise, newBlankExercise);
              return blankExercise;
            });

          return await transactionalEntityManager.save(workbook);
        },
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error creating workbook ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findAll() {
    return `This action returns all workbooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workbook`;
  }

  update(id: number, updateWorkbookDto: UpdateWorkbookDto) {
    return `This action updates a #${id} workbook`;
  }

  remove(id: number) {
    return `This action removes a #${id} workbook`;
  }
}
