import { Test, TestingModule } from '@nestjs/testing';
import { BlankExerciseProgressController } from './blank-exercise-progress.controller';
import { BlankExerciseProgressService } from './blank-exercise-progress.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BlankExerciseProgress } from './entities/blank-exercise-progress.entity';

describe('BlankExerciseProgressController', () => {
  let controller: BlankExerciseProgressController;

  const mockBlankExerciseProgressRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlankExerciseProgressController],
      providers: [
        BlankExerciseProgressService,
        {
          provide: getRepositoryToken(BlankExerciseProgress),
          useValue: mockBlankExerciseProgressRepository,
        },
      ],
    }).compile();

    controller = module.get<BlankExerciseProgressController>(
      BlankExerciseProgressController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
