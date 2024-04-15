import { Test, TestingModule } from '@nestjs/testing';
import { GuidesController } from './guides.controller';
import { GuidesService } from './guides.service';
import { EntityManager } from 'typeorm';
import { Guide } from './entities/guide.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Translation } from 'src/translations/entities/translation.entity';
import { Sentence } from 'src/sentences/entities/sentence.entity';
import { Level } from './enums/level.enum';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateFullGuideDto } from './dto/create-full-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { afterEach } from 'node:test';

describe('GuidesController', () => {
  // You want to ensure that the controller is handling the data from the service correctly.
  // You need to simulate different responses from the service
  // (e.g., success, error) to test the controller's error handling and response mapping.
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

  afterEach(() => {
    jest.clearAllMocks();
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
        workbooks: [],
      },
    ];

    jest.spyOn(guidesService, 'findAll').mockResolvedValue(mockGuides);
    // act Execute the function under test.
    const result = await guidesController.findAll();

    // assert Check that the function behaved as expected.
    expect(result).toEqual(mockGuides);
  });

  it('should fail to get all guides', async () => {
    // arrange Set up any prerequisites for the test. This includes preparing data and setting up mocks.
    const mockHttpException = new HttpException(
      'Error finding guides in the database',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

    jest.spyOn(guidesService, 'findAll').mockRejectedValue(mockHttpException);

    // act and assert Execute the function under test, Check that the function behaved as expected.
    expect(guidesController.findAll()).rejects.toThrow(mockHttpException);
  });

  it('should get a single guide', async () => {
    // arrange Set up any prerequisites for the test. This includes preparing data and setting up mocks.
    const mockGuide = {
      id: 1,
      level: Level.A1,
      title: 'title',
      description: 'description',
      subDescription: 'subDescription',
      examples: 'examples',
      sentences: [],
      translations: [],
      workbooks: [],
    };
    jest.spyOn(guidesService, 'findOne').mockResolvedValue(mockGuide);
    // act Execute the function under test.
    const result = await guidesController.findOne('1');

    // assert Check that the function behaved as expected.
    expect(result).toEqual(mockGuide);
    expect(guidesService.findOne).toHaveBeenCalledWith(1);
  });

  it('should fail to get a single guide', async () => {
    // arrange Set up any prerequisites for the test. This includes preparing data and setting up mocks.
    const mockHttpException = new HttpException(
      'Could not find guide with id: 110',
      HttpStatus.NOT_FOUND,
    );

    jest.spyOn(guidesService, 'findOne').mockRejectedValue(mockHttpException);

    // assert Check that the function behaved as expected.
    expect(guidesController.findOne('100')).rejects.toThrow(mockHttpException);
    expect(guidesService.findOne).toHaveBeenCalledWith(100);
  });

  it('should create a single guide', async () => {
    // arrange Set up any prerequisites for the test. This includes preparing data and setting up mocks.
    const mockGuide: CreateFullGuideDto = {
      level: Level.A1,
      title: 'title',
      description: 'description',
      subDescription: 'subDescription',
      examples: 'examples',
      sentences: [],
      translations: [],
    };
    jest.spyOn(guidesService, 'create').mockResolvedValue(mockGuide);

    // act Execute the function under test.
    const result = await guidesController.create(mockGuide);

    // assert Check that the function behaved as expected.
    expect(result).toEqual(mockGuide);
    expect(guidesService.create).toHaveBeenCalledWith(mockGuide);
  });

  it('should fail to create a single guide', async () => {
    // arrange Set up any prerequisites for the test. This includes preparing data and setting up mocks.
    const mockHttpException: HttpException = new HttpException(
      'Error creating guide in the database',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    const mockGuide: CreateFullGuideDto = {
      level: Level.A1,
      title: 'title',
      description: 'description',
      subDescription: 'subDescription',
      examples: 'examples',
      sentences: [],
      translations: [],
    };
    jest.spyOn(guidesService, 'create').mockRejectedValue(mockHttpException);

    // assert Check that the function behaved as expected.
    expect(guidesController.create(mockGuide)).rejects.toThrow(
      mockHttpException,
    );
    expect(guidesService.create).toHaveBeenCalledWith(mockGuide);
  });

  it('should update a single guide', async () => {
    // arrange Set up any prerequisites for the test. This includes preparing data and setting up mocks.
    const mockGuide: UpdateGuideDto = {
      level: Level.A1,
      title: 'title',
      description: 'description',
      subDescription: 'subDescription',
      examples: 'examples',
      sentences: [],
      translations: [],
    };
    jest.spyOn(guidesService, 'update').mockResolvedValue(mockGuide);

    // act Execute the function under test.
    const result = await guidesController.update('1', mockGuide);

    // assert Check that the function behaved as expected.
    expect(result).toEqual(mockGuide);
    expect(guidesService.update).toHaveBeenCalledWith(1, mockGuide);
  });

  it('should fail to update a single guide', async () => {
    // arrange Set up any prerequisites for the test. This includes preparing data and setting up mocks.
    const mockGuide: UpdateGuideDto = {
      level: Level.A1,
      title: 'title',
      description: 'description',
      subDescription: 'subDescription',
      examples: 'examples',
      sentences: [],
      translations: [],
    };
    const mockHttpException: HttpException = new HttpException(
      'Could not update guide with id 110',
      HttpStatus.BAD_REQUEST,
    );
    jest.spyOn(guidesService, 'update').mockRejectedValue(mockHttpException);

    // act Execute the function under test.

    // assert Check that the function behaved as expected.
    await expect(guidesController.update('110', mockGuide)).rejects.toThrow(
      mockHttpException,
    );
    expect(guidesService.update).toHaveBeenCalledWith(110, mockGuide);
  });

  it('should delete a single guide', async () => {
    // arrange Set up any prerequisites for the test. This includes preparing data and setting up mocks.
    const mockGuideId: string = '1';
    const expectedMessage = `Successfully removed guide ${mockGuideId}`;
    jest.spyOn(guidesService, 'remove').mockResolvedValue(expectedMessage);

    // act Execute the function under test.
    const result = await guidesController.remove(mockGuideId);

    // assert Check that the function behaved as expected.
    expect(result).toEqual(expectedMessage);
    expect(guidesService.remove).toHaveBeenCalledWith(1);
  });

  it('should throw a Internal Server Error when trying to delete a single guide', async () => {
    // arrange Set up any prerequisites for the test. This includes preparing data and setting up mocks.
    const mockGuideId: string = '1';
    const expectedMessage: HttpException = new HttpException(
      `Could not delete guide with id: ${mockGuideId}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    jest.spyOn(guidesService, 'remove').mockRejectedValue(expectedMessage);

    // act and assert Execute the function under test.
    await expect(guidesController.remove(mockGuideId)).rejects.toThrow(
      expectedMessage,
    );

    // assert Check that the function behaved as expected.
    expect(guidesService.remove).toHaveBeenCalledWith(1);
  });
});
