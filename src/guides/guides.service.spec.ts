import { Test, TestingModule } from '@nestjs/testing';
import { GuidesService } from './guides.service';
import { EntityManager } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Guide } from './entities/guide.entity';
import { Translation } from 'src/translations/entities/translation.entity';
import { Sentence } from 'src/sentences/entities/sentence.entity';
import { Level } from './enums/level.enum';
import { HttpException, HttpStatus } from '@nestjs/common';
import exp from 'constants';

describe('GuidesService', () => {
  let service: GuidesService;

  const mockGuideRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
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

    service = module.get<GuidesService>(GuidesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a guide by id', async () => {
    // arrange
    const guide: Guide = {
      id: 1,
      level: Level.A1,
      title: 'title',
      description: 'description',
      subDescription: 'subDescription',
      examples: 'examples',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      workbooks: [],
      sentences: [],
      translations: [],
    };
    jest.spyOn(mockGuideRepository, 'findOne').mockResolvedValue(guide);

    // act
    const result = await service.findGuide(1);

    // assert
    expect(result).toEqual(guide);
    expect(mockGuideRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['translations', 'sentences', 'workbooks'],
    });
  });

  // test negative
  it('should fail to find a guide by id', async () => {
    // arrange
    const mockHttpException = new HttpException(
      'Could not find guide with id: 110',
      HttpStatus.NOT_FOUND,
    );
    jest
      .spyOn(mockGuideRepository, 'findOne')
      .mockRejectedValue(mockHttpException);

    // act and assert
    await expect(service.findGuide(110)).rejects.toThrow(mockHttpException);
  });

  it('should handle invalid ID input gracefully', async () => {
    const invalidId = Number.MAX_SAFE_INTEGER + 1;
    jest.spyOn(mockGuideRepository, 'findOne').mockResolvedValue(null);

    await expect(service.findGuide(invalidId)).rejects.toThrow(
      new HttpException(
        'The ID is out of acceptable range',
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('should complete within 200ms', async () => {
    // arrange
    const guide: Guide = {
      id: 1,
      level: Level.A1,
      title: 'title',
      description: 'description',
      subDescription: 'subDescription',
      examples: 'examples',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      workbooks: [],
      sentences: [],
      translations: [],
    };
    jest.spyOn(mockGuideRepository, 'findOne').mockResolvedValue(guide);
    const validId = 1;
    const startTime = performance.now();

    await service.findGuide(validId);

    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(200); // time in milliseconds
  });

  it('should handle database errors gracefully', async () => {
    const mockHttpException = new HttpException(
      'A database error occurred while retrieving the guide',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    jest
      .spyOn(mockGuideRepository, 'findOne')
      .mockRejectedValue(mockHttpException);

    // act and assert
    await expect(service.findGuide(1)).rejects.toThrow(HttpException);
    await expect(service.findGuide(1)).rejects.toHaveProperty(
      'response',
      'A database error occurred while retrieving the guide',
    );
    await expect(service.findGuide(1)).rejects.toHaveProperty(
      'status',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  });

  it('should delete a guide', async () => {
    // arrange
    const guide: Guide = {
      id: 1,
      level: Level.A1,
      title: 'title',
      description: 'description',
      subDescription: 'subDescription',
      examples: 'examples',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
      workbooks: [],
      sentences: [],
      translations: [],
    };
    jest.spyOn(mockGuideRepository, 'findOne').mockResolvedValue(guide);
    jest.spyOn(mockGuideRepository, 'remove').mockResolvedValue(guide);

    const mockSuccessfulMessage = `Successfully removed guide ${guide.id}`;

    // act
    const result = await service.remove(1);

    // assert
    expect(result).toEqual(mockSuccessfulMessage);
    expect(mockGuideRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['translations', 'sentences', 'workbooks'],
    });
    expect(mockGuideRepository.remove).toHaveBeenCalledWith(guide);
  });
});
