import { Test, TestingModule } from '@nestjs/testing';
import { UserProgressService } from './user-progress.service';
import { EntityManager } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { BlankExercise } from 'src/blank-exercises/entities/blank-exercise.entity';
import { Workbook } from 'src/workbooks/entities/workbook.entity';

describe('UserProgressService', () => {
  let service: UserProgressService;

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

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
        UserProgressService,
        EntityManager,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(BlankExercise),
          useValue: mockBlankExerciseRepository,
        },
        {
          provide: getRepositoryToken(Workbook),
          useValue: mockWorkbookRepository,
        },
      ],
    }).compile();

    service = module.get<UserProgressService>(UserProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
