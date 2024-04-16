import { Test, TestingModule } from '@nestjs/testing';
import { WorkbookProgressController } from './workbook-progress.controller';
import { WorkbookProgressService } from './workbook-progress.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WorkbookProgress } from './entities/workbook-progress.entity';

describe('WorkbookProgressController', () => {
  let controller: WorkbookProgressController;

  const workbookProgressRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkbookProgressController],
      providers: [
        WorkbookProgressService,
        {
          provide: getRepositoryToken(WorkbookProgress),
          useValue: workbookProgressRepository,
        },
      ],
    }).compile();

    controller = module.get<WorkbookProgressController>(
      WorkbookProgressController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
