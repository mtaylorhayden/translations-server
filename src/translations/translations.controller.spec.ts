import { Test, TestingModule } from '@nestjs/testing';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Guide } from 'src/guides/entities/guide.entity';
import { Translation } from './entities/translation.entity';
import { EntityManager } from 'typeorm';

describe('TranslationsController', () => {
  let controller: TranslationsController;

  const mockGuideRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockTranslationRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslationsController],
      providers: [
        TranslationsService,
        EntityManager,
        {
          provide: getRepositoryToken(Guide),
          useValue: mockGuideRepository,
        },
        {
          provide: getRepositoryToken(Translation),
          useValue: mockTranslationRepository,
        },
      ],
    }).compile();

    controller = module.get<TranslationsController>(TranslationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
