import { Test, TestingModule } from '@nestjs/testing';
import { GuidesController } from './guides.controller';
import { GuidesService } from './guides.service';
import { EntityManager, Repository } from 'typeorm';
import { Guide } from './entities/guide.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Translation } from 'src/translations/entities/translation.entity';
import { Sentence } from 'src/sentences/entities/sentence.entity';
import { GetGuideDto } from './dto/get-guide.dto';
import { Level } from './enums/level.enum';

describe('GuidesController', () => {
  let guidesController: GuidesController;
  let guidesService: GuidesService;

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

  const mockSentenceRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuidesController],
      providers: [
        GuidesService,
        EntityManager,
        {
          provide: getRepositoryToken(Guide),
          useValue: mockGuideRepository,
        },
        {
          provide: getRepositoryToken(Translation),
          useValue: mockTranslationRepository,
        },
        {
          provide: getRepositoryToken(Sentence),
          useValue: mockSentenceRepository,
        },
      ],
    }).compile();

    guidesController = module.get<GuidesController>(GuidesController);
    guidesService = module.get<GuidesService>(GuidesService);
  });

  it('should be defined', () => {
    expect(guidesController).toBeDefined();
  });

  it('should get all guides', async () => {
    // arrange Set up any prerequisites for the test. This includes preparing data and setting up mocks.
    const mockGuides = [
      {
        id: 1,
        level: Level.A1,
        title: 'title',
        description: 'description',
        subDescription: 'subDescription',
        examples: 'examples',
        sentences: [],
        translations: [],
      },
    ];

    jest.spyOn(guidesService, 'findAll').mockResolvedValue(mockGuides);
    // act Execute the function under test.
    const result = await guidesController.findAll();

    // assert Check that the function behaved as expected.
    expect(result).toEqual(mockGuides);
  });
});
