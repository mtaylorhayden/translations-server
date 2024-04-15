import { Test, TestingModule } from '@nestjs/testing';
import { TranslationsService } from './translations.service';
import { EntityManager } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Guide } from 'src/guides/entities/guide.entity';
import { Translation } from './entities/translation.entity';

describe('TranslationsService', () => {
  let service: TranslationsService;

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

    service = module.get<TranslationsService>(TranslationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
