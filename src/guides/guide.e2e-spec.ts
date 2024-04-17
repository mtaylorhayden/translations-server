import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { GuidesService } from './guides.service';
import { Level } from './enums/level.enum';
import { CreateFullGuideDto } from './dto/create-full-guide.dto';

describe('GuideController (e2e)', () => {
  let app: INestApplication;
  let guidesService: GuidesService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    guidesService = moduleFixture.get<GuidesService>(GuidesService); // Get the instance from the module
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /guides and checks result structure', () => {
    jest.spyOn(guidesService, 'findAll').mockResolvedValue([
      {
        id: 1,
        level: Level.A1,
        title: 'Guide to Testing',
        description: 'A comprehensive guide to effective testing.',
        subDescription: 'This covers unit, integration, and e2e tests.',
        examples: 'Example content here',
        sentences: [], // Assuming Sentence is an array of some objects
        translations: [], // Assuming Translation is an array of some objects
        workbooks: [], // Assuming Workbook is an array of some objects
      },
    ]);
    return request(app.getHttpServer())
      .get('/guides')
      .expect(200)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0); // Ensure the array is not empty
        const guide = response.body[0];
        expect(guide).toHaveProperty('id');
        expect(guide).toHaveProperty('level');
        expect(guide).toHaveProperty('title');
        expect(guide).toHaveProperty('description');
        expect(guide).toHaveProperty('subDescription');
        expect(guide).toHaveProperty('examples');
        expect(guide).toHaveProperty('sentences');
        expect(guide).toHaveProperty('translations');
        expect(guide).toHaveProperty('workbooks');
        // Optionally, you can add more detailed checks for each property
        // For example:
        expect(typeof guide.id).toBe('number');
        expect(typeof guide.title).toBe('string');
        // For arrays:
        expect(Array.isArray(guide.sentences)).toBe(true);
        expect(Array.isArray(guide.translations)).toBe(true);
      });
  });

  it('GET /guides should handle server errors gracefully', () => {
    jest.spyOn(guidesService, 'findAll').mockImplementation(() => {
      throw new HttpException(
        'Error finding guides in the database',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

    return request(app.getHttpServer())
      .get('/guides')
      .expect(500)
      .then((response) => {
        expect(response.body).toEqual({
          statusCode: 500,
          message: 'Error finding guides in the database',
        });
      });
  });

  it("GET /guides should return empty array if there's no guides in the database", () => {
    jest.spyOn(guidesService, 'findAll').mockResolvedValue([]);
    return request(app.getHttpServer())
      .get('/guides')
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual([]);
        expect(response.status).toBe(200);
      });
  });

  it('POST /guides should create a new guide with nested workbook relationship', async () => {
    const createGuideDto: CreateFullGuideDto = {
      level: Level.A1,
      title: 'Guide to Testing',
      description: 'A comprehensive guide to effective testing.',
      subDescription: 'This covers unit, integration, and e2e tests.',
      examples: 'Example content here',
      sentences: [
        { id: 1, aSide: 'Example A', bSide: 'Example B', guide: null },
      ],
      translations: [
        {
          id: 1,
          englishWord: 'Test',
          turkishInfinitive: 'Testmek',
          turkishConjugated: 'Testedik',
          createdAt: new Date(),
          isDeleted: false,
          updatedAt: new Date(),
          guide: null,
        },
      ],
      workbooks: [
        {
          id: 1,
          title: 'Test Workbook',
          description: 'Test Workbook Description',
          workbookProgress: [],
          guide: null,
          isComplete: false,
          blankExercises: [
            {
              id: 1,
              exercise: 'test',
              exerciseAnswer: 'testAnswer',
              isComplete: false,
              blankExerciseProgress: [],
              workbook: null,
            },
          ],
        },
      ],
    };

    const response = await request(app.getHttpServer())
      .post('/guides')
      .send(createGuideDto)
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({
      level: createGuideDto.level,
      title: createGuideDto.title,
      description: createGuideDto.description,
      subDescription: createGuideDto.subDescription,
      examples: createGuideDto.examples,
      sentences: [
        {
          aSide: 'Example A',
          bSide: 'Example B',
        },
      ],
      translations: expect.arrayContaining([
        expect.objectContaining({
          englishWord: 'Test',
        }),
      ]),
      workbooks: expect.arrayContaining([
        expect.objectContaining({
          title: 'Test Workbook',
        }),
      ]),
    });
  });
});
