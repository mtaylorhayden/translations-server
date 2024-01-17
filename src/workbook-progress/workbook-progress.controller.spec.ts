import { Test, TestingModule } from '@nestjs/testing';
import { WorkbookProgressController } from './workbook-progress.controller';
import { WorkbookProgressService } from './workbook-progress.service';

describe('WorkbookProgressController', () => {
  let controller: WorkbookProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkbookProgressController],
      providers: [WorkbookProgressService],
    }).compile();

    controller = module.get<WorkbookProgressController>(WorkbookProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
