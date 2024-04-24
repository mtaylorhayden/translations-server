import { Test, TestingModule } from '@nestjs/testing';
import { SentencesService } from './sentences.service';
import { EntityManager } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Guide } from 'src/guides/entities/guide.entity';
import { Sentence } from './entities/sentence.entity';

describe('SentencesService', () => {
  let service: SentencesService;

  const mockSentenceRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockGuideRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SentencesService,
        EntityManager,
        {
          provide: getRepositoryToken(Guide),
          useValue: mockGuideRepository,
        },
        {
          provide: getRepositoryToken(Sentence),
          useValue: mockSentenceRepository,
        },
      ],
    }).compile();

    service = module.get<SentencesService>(SentencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
