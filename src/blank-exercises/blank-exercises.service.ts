import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlankExerciseDto } from './dto/create-blank-exercise.dto';
import { UpdateBlankExerciseDto } from './dto/update-blank-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlankExercise } from './entities/blank-exercise.entity';
import { EntityManager, Repository } from 'typeorm';
import { Workbook } from 'src/workbooks/entities/workbook.entity';

@Injectable()
export class BlankExercisesService {
  constructor(
    private entityManager: EntityManager,
    @InjectRepository(BlankExercise)
    private blankExerciseRepository: Repository<BlankExercise>,
    @InjectRepository(Workbook)
    private workbookRepository: Repository<Workbook>,
  ) {}

  async findAllByWorkbookId(workbookId: number) {
    try {
      const workbook = await this.workbookRepository.findOne({
        where: { id: workbookId },
        relations: ['blankExercises'],
      });
      if (!workbook) {
        throw new NotFoundException(`Guide with id ${workbookId} not found`);
      }
      return workbook.blankExercises;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error finding exercises for workbook id: ${workbookId}. Error: ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new Error('Method not implemented.');
  }

  async create(
    createBlankExerciseDto: CreateBlankExerciseDto,
    workbookId: number,
  ): Promise<BlankExercise> {
    try {
      return await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          // try saving like this instead of making new object
          const blankExercise = await transactionalEntityManager.save(
            BlankExercise,
            createBlankExerciseDto,
          );

          let workbook = await transactionalEntityManager.findOne(Workbook, {
            where: { id: workbookId },
            relations: ['blankExercises'],
          });
          if (!workbook) {
            throw new NotFoundException(
              `Guide with id ${workbookId} not found`,
            );
          }
          workbook.blankExercises.push(blankExercise);
          await transactionalEntityManager.save(workbook);
          return blankExercise;
        },
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error creating exercise ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findAll() {
    return `This action returns all blankExercises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blankExercise`;
  }

  update(id: number, updateBlankExerciseDto: UpdateBlankExerciseDto) {
    return `This action updates a #${id} blankExercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} blankExercise`;
  }
}
