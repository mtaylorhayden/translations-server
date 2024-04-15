import { Test, TestingModule } from '@nestjs/testing';
import { BlankExercisesService } from './blank-exercises.service';
import { EntityManager } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Workbook } from 'src/workbooks/entities/workbook.entity';
import { BlankExercise } from './entities/blank-exercise.entity';

describe('BlankExercisesService', () => {
  let service: BlankExercisesService;

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

    service = module.get<BlankExercisesService>(BlankExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
