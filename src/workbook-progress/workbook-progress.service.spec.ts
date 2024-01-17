import { Test, TestingModule } from '@nestjs/testing';
import { WorkbookProgressService } from './workbook-progress.service';

describe('WorkbookProgressService', () => {
  let service: WorkbookProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkbookProgressService],
    }).compile();

    service = module.get<WorkbookProgressService>(WorkbookProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
