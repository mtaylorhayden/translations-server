import { Test, TestingModule } from '@nestjs/testing';
import { BlankExerciseProgressService } from './blank-exercise-progress.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BlankExerciseProgress } from './entities/blank-exercise-progress.entity';

describe('BlankExerciseProgressService', () => {
  let service: BlankExerciseProgressService;

  const mockBlankExerciseProgressRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlankExerciseProgressService,
        {
          provide: getRepositoryToken(BlankExerciseProgress),
          useValue: mockBlankExerciseProgressRepository,
        },
      ],
    }).compile();

    service = module.get<BlankExerciseProgressService>(
      BlankExerciseProgressService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
