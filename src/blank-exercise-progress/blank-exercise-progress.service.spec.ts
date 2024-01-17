import { Test, TestingModule } from '@nestjs/testing';
import { BlankExerciseProgressService } from './blank-exercise-progress.service';

describe('BlankExerciseProgressService', () => {
  let service: BlankExerciseProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlankExerciseProgressService],
    }).compile();

    service = module.get<BlankExerciseProgressService>(BlankExerciseProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
