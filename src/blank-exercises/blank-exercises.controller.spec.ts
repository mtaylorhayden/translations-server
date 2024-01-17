import { Test, TestingModule } from '@nestjs/testing';
import { BlankExercisesController } from './blank-exercises.controller';
import { BlankExercisesService } from './blank-exercises.service';

describe('BlankExercisesController', () => {
  let controller: BlankExercisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlankExercisesController],
      providers: [BlankExercisesService],
    }).compile();

    controller = module.get<BlankExercisesController>(BlankExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
