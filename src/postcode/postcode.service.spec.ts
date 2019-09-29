import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/common';
import { PostcodeService } from './postcode.service';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('PostcodeService', () => {
  let postcodeService: PostcodeService;
  let httpService: HttpService;

  beforeEach(async () => {
    const postcode: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [],
      providers: [PostcodeService],
    }).compile();

    postcodeService = postcode.get<PostcodeService>(PostcodeService);
    httpService = postcode.get<HttpService>(HttpService);
  });

  describe('getGreeting', () => {
    it('returns the endpoint greeting', () => {
      expect(postcodeService.getGreeting()).toMatch(/^This endpoint/);
    });
  });

  describe('validatePostcode', () => {
    describe('when valid postcode is passed', () => {
      it('returns TRUE', () => {
        expect(postcodeService.validatePostcode('SW1A0AA')).toBe(true);
      });
    });

    describe('when invalid postcode is passed', () => {
      it('returns FALSE', () => {
        expect(postcodeService.validatePostcode('Invalid postcode')).toBe(false);
      });
    });
  });

  describe('fetchPostcodeDistrict', () => {
    const sampleDistrict = 'Westminster';

    beforeEach(() => {
      const result: AxiosResponse = {
        data: {
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
            admin_district: sampleDistrict,
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
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    });

    it('returns TRUE', () => {
      expect.assertions(1);
      postcodeService
        .fetchPostcodeDistrict('SW1A0AA')
        .then(result =>
          expect(result).toEqual(sampleDistrict),
        );
    });
  });
});
