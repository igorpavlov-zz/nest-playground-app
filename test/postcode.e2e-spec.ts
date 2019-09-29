import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PostcodeModule } from './../src/postcode/postcode.module';
import * as nock from 'nock';
import postcodeMock from '../mocks/postcode.mock';

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
      .expect(200);
  });

  describe('postcode info', () => {
    const samplePostcode = postcodeMock.constants.samplePostcode;

    describe('when postcode is valid', () => {
      beforeEach(() => {
        nock('https://api.postcodes.io')
          .get(`/postcodes/${samplePostcode}`)
          .reply(200, {
            status: 200,
            result: postcodeMock.responds.postcodeInformationByPostcode,
          });
      });
      it('/postcode/:postcode (GET)', () => {
        return request(app.getHttpServer())
          .get(`/postcode/${samplePostcode}`)
          .expect(200)
          .expect({
            requestedPostcode: samplePostcode,
            district: postcodeMock.constants.sampleDistrict,
          });
      });
    });

    describe('when postcode is invalid', () => {
      it('/postcode/:postcode (GET)', () => {
        return request(app.getHttpServer())
          .get('/postcode/invalidpostcode')
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'Invalid postcode. A valid postcode example is SW1A0AA',
          });
      });
    });
  });
});
