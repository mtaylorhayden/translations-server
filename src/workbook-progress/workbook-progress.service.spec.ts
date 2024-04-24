import { Test, TestingModule } from '@nestjs/testing';
import { WorkbookProgressService } from './workbook-progress.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WorkbookProgress } from './entities/workbook-progress.entity';

describe('WorkbookProgressService', () => {
  let service: WorkbookProgressService;

  const workbookProgressRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkbookProgressService,
        {
          provide: getRepositoryToken(WorkbookProgress),
          useValue: workbookProgressRepository,
        },
      ],
    }).compile();

    service = module.get<WorkbookProgressService>(WorkbookProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
