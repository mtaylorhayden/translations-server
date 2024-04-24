import { Test, TestingModule } from '@nestjs/testing';
import { WorkbooksService } from './workbooks.service';
import { EntityManager } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Workbook } from './entities/workbook.entity';
import { Guide } from 'src/guides/entities/guide.entity';

describe('WorkbooksService', () => {
  let service: WorkbooksService;

  const mockWorkbookRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockGuidesRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkbooksService,
        EntityManager,
        {
          provide: getRepositoryToken(Workbook),
          useValue: mockWorkbookRepository,
        },
        {
          provide: getRepositoryToken(Guide),
          useValue: mockGuidesRepository,
        },
      ],
    }).compile();

    service = module.get<WorkbooksService>(WorkbooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
