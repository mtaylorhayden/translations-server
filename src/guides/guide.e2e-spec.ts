import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /guides', () => {
    return request(app.getHttpServer())
      .get('/guides')
      .expect(200)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        // Optionally, check for the structure of response if you know what data to expect
        // e.g., expect(response.body[0]).toHaveProperty('id');
      });
  });
});
