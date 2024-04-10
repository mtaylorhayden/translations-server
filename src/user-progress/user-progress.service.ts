import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { UpdateUserProgressDto } from './dto/update-user-progress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workbook } from 'src/workbooks/entities/workbook.entity';
import { EntityManager, Repository } from 'typeorm';
import { WorkbookProgress } from 'src/workbook-progress/entities/workbook-progress.entity';
import { BlankExerciseProgress } from 'src/blank-exercise-progress/entities/blank-exercise-progress.entity';
import { Status } from 'src/blank-exercise-progress/enums/status.enum';
import { BlankExercise } from 'src/blank-exercises/entities/blank-exercise.entity';
import { UserProgress } from './entities/user-progress.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserProgressService {
  constructor(
    private entityManager: EntityManager,
    @InjectRepository(Workbook)
    private workbookRepository: Repository<Workbook>,
    @InjectRepository(BlankExercise)
    private blankExerciseRepository: Repository<BlankExercise>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createUserProgressDto: CreateUserProgressDto,
    workbookId: number,
    // blankExerciseId: number,
  ) {
    try {
      // find the objects need for creating userProgress
      let workbook = await this.getWorkbookById(workbookId);
      // let blankExercise = await this.getBlankExerciseById(blankExerciseId);
      let user = await this.getUserById(+createUserProgressDto.userId);

      // all database creates go in here for rollback
      return await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          // now we have an array of exerciseProgresses
          let blankExerciseProgresses: BlankExerciseProgress[] =
            await this.createBlankExerciseProgress(
              workbook.blankExercises,
              transactionalEntityManager,
            );
          let workbookProgress = await this.createWorkbookProgress(
            workbook,
            transactionalEntityManager,
          );
          return await this.createUserProgress(
            blankExerciseProgresses,
            workbookProgress,
            user,
            transactionalEntityManager,
          );
        },
      );
    } catch (error) {
      console.error('Error creating user progress:', error);

      throw new HttpException(
        `Failed to create user progress due to an unexpected error. Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getUserById(userId: number): Promise<User> {
    const user = this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`Couldn't find user with id of ${userId}`);
    }
    return user;
  }

  async createUserProgress(
    blankExerciseProgresses: BlankExerciseProgress[],
    workbookProgress: WorkbookProgress,
    user: User,
    transactionalEntityManager: EntityManager,
  ): Promise<UserProgress[]> {
    let userProgresses: UserProgress[] = [];
    // we need to create a new userProgress for each blankExerciseProgress
    blankExerciseProgresses.forEach(async (blankExerciseProgress) => {
      let userProgress = new UserProgress();
      userProgress.blankExerciseProgress = blankExerciseProgress;
      userProgress.workbookProgress = workbookProgress;
      userProgress.user = user;
      await transactionalEntityManager.save(UserProgress, userProgress);
      userProgresses.push(userProgress);
    });
    return userProgresses;
  }

  async getBlankExerciseById(blankExerciseId: number) {
    const blankExercise = await this.blankExerciseRepository.findOne({
      where: { id: blankExerciseId },
      relations: ['workbook'],
    });
    if (!blankExercise) {
      throw new NotFoundException(
        `Couldn't find blank exercise with id of ${blankExerciseId}`,
      );
    }
    return blankExercise;
  }

  async createBlankExerciseProgress(
    blankExercises: BlankExercise[],
    transactionalEntityManager: EntityManager,
  ): Promise<BlankExerciseProgress[]> {
    let blankExerciseProgresses: BlankExerciseProgress[] = [];

    // create a progress for each blank exercise
    blankExercises.forEach(async (blankExercise, index) => {
      let blankExerciseProgress: BlankExerciseProgress =
        new BlankExerciseProgress();
      if (index === 0) {
        blankExerciseProgress.status = Status.IN_PROGRESS;
      }
      blankExerciseProgress.status = Status.NOT_STARTED;
      blankExerciseProgress.blankExercise = blankExercise;
      await transactionalEntityManager.save(
        BlankExerciseProgress,
        blankExerciseProgress,
      );
      blankExerciseProgresses.push(blankExerciseProgress);
    });
    return blankExerciseProgresses;
  }

  async createWorkbookProgress(
    workbook: Workbook,
    transactionalEntityManager: EntityManager,
  ): Promise<WorkbookProgress> {
    let workbookProgress = new WorkbookProgress();
    workbookProgress.percentageFinished = 0;
    workbookProgress.status = Status.IN_PROGRESS;
    workbookProgress.workbook = workbook;

    return await transactionalEntityManager.save(
      WorkbookProgress,
      workbookProgress,
    );
  }

  calculatePercentageFinished(workbook: Workbook, userId: number): number {
    // find all the exercises in the workbook where the
    throw new Error('Method not implemented.');
  }

  async getWorkbookById(workbookId: number): Promise<Workbook> {
    const workbook = await this.workbookRepository.findOne({
      where: { id: workbookId },
    });
    if (!workbook) {
      throw new NotFoundException(
        `Couldn't find workbook with id of ${workbookId}`,
      );
    }
    return workbook;
  }

  findAll() {
    return `This action returns all userProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userProgress`;
  }

  update(id: number, updateUserProgressDto: UpdateUserProgressDto) {
    return `This action updates a #${id} userProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProgress`;
  }
}
