import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PostcodeModule } from './../src/postcode/postcode.module';
import * as nock from 'nock';

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
    const samplePostcode = 'SW1A0AA';
    const sampleDistrict = 'Westminster';

    describe('when postcode is valid', () => {
      beforeEach(() => {
        nock('https://api.postcodes.io')
          .get(`/postcodes/${samplePostcode}`)
          .reply(200, {
            status: 200,
            result: {
              postcode: 'SW1A 0AA',
              quality: 1,
              eastings: 530268,
              northings: 179545,
              country: 'England',
              nhs_ha: 'London',
              longitude: -0.124663,
              latitude: 51.49984,
              european_electoral_region: 'London',
              primary_care_trust: 'Westminster',
              region: 'London',
              lsoa: 'Westminster 020C',
              msoa: 'Westminster 020',
              incode: '0AA',
              outcode: 'SW1A',
              parliamentary_constituency: 'Cities of London and Westminster',
              admin_district: 'Westminster',
              parish: 'Westminster, unparished area',
              admin_county: null,
              admin_ward: 'St James\'s',
              ced: null,
              ccg: 'NHS Central London (Westminster)',
              nuts: 'Westminster',
              codes: {
                admin_district: 'E09000033',
                admin_county: 'E99999999',
                admin_ward: 'E05000644',
                parish: 'E43000236',
                parliamentary_constituency: 'E14000639',
                ccg: 'E38000031',
                ced: 'E99999999',
                nuts: 'UKI32',
              },
            },
          });
      });
      it('/postcode/:postcode (GET)', () => {
        return request(app.getHttpServer())
          .get(`/postcode/${samplePostcode}`)
          .expect(200)
          .expect({
            requestedPostcode: samplePostcode,
            district: sampleDistrict,
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
