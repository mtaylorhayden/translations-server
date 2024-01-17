import { Test, TestingModule } from '@nestjs/testing';
import { BlankExercisesService } from './blank-exercises.service';

describe('BlankExercisesService', () => {
  let service: BlankExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlankExercisesService],
    }).compile();

    service = module.get<BlankExercisesService>(BlankExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
