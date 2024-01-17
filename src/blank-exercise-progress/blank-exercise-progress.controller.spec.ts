import { Test, TestingModule } from '@nestjs/testing';
import { BlankExerciseProgressController } from './blank-exercise-progress.controller';
import { BlankExerciseProgressService } from './blank-exercise-progress.service';

describe('BlankExerciseProgressController', () => {
  let controller: BlankExerciseProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlankExerciseProgressController],
      providers: [BlankExerciseProgressService],
    }).compile();

    controller = module.get<BlankExerciseProgressController>(BlankExerciseProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
