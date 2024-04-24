import { Test, TestingModule } from '@nestjs/testing';
import { BlankExercisesController } from './blank-exercises.controller';
import { BlankExercisesService } from './blank-exercises.service';
import { EntityManager } from 'typeorm';
import { Workbook } from 'src/workbooks/entities/workbook.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BlankExercise } from './entities/blank-exercise.entity';

describe('BlankExercisesController', () => {
  let controller: BlankExercisesController;

  const mockWorkbookRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockBlankExerciseRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlankExercisesController],
      providers: [
        BlankExercisesService,
        EntityManager,
        {
          provide: getRepositoryToken(Workbook),
          useValue: mockWorkbookRepository,
        },
        {
          provide: getRepositoryToken(BlankExercise),
          useValue: mockBlankExerciseRepository,
        },
      ],
    }).compile();

    controller = module.get<BlankExercisesController>(BlankExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
