import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PostcodeModule } from './../src/postcode/postcode.module';

describe('PostcodeController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostcodeModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/postcode (GET)', () => {
    return request(app.getHttpServer())
      .get('/postcode')
      .expect(200)
      .expect(/^This endpoint/);
  });

  it('/postcode/:postcode (GET)', () => {
    return request(app.getHttpServer())
      .get('/postcode/SW1A0AA')
      .expect(200)
      .expect({
        requestedPostcode: 'SW1A0AA',
      });
  });
});
