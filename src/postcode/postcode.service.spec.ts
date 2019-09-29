import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/common';
import { PostcodeService } from './postcode.service';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import postcodeMock from '../../mocks/postcode.mock';

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
    beforeEach(() => {
      const result: AxiosResponse = {
        data: {
          status: 200,
          result: postcodeMock.responds.postcodeInformationByPostcode,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    });

    it('returns correspondent postcode district', () => {
      expect.assertions(1);
      postcodeService
        .fetchPostcodeDistrict('SW1A0AA')
        .then(result =>
          expect(result).toEqual(postcodeMock.constants.sampleDistrict),
        );
    });
  });
});
