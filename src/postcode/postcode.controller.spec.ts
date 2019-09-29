import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { PostcodeController } from './postcode.controller';
import { PostcodeService } from './postcode.service';
import postcodeMock from '../../mocks/postcode.mock';

describe('PostcodeController', () => {
  let postcodeController: PostcodeController;
  let postcodeService: PostcodeService;

  beforeEach(async () => {
    const postcode: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PostcodeController],
      providers: [PostcodeService],
    }).compile();

    postcodeController = postcode.get<PostcodeController>(PostcodeController);
    postcodeService = postcode.get<PostcodeService>(PostcodeService);
  });

  describe('root', () => {
    const postcodeServiceGreetingMessage = 'Any greeting message';

    beforeEach(() => {
      jest.spyOn(postcodeService, 'getGreeting').mockImplementationOnce(() => postcodeServiceGreetingMessage);
    });

    it('should return greeting from the greeting service', () => {
      expect(postcodeController.getGreeting()).toMatch(postcodeServiceGreetingMessage);
    });
  });

  describe('postcode info', () => {
    const samplePostcode = postcodeMock.constants.samplePostcode;
    const sampleDistrict = postcodeMock.constants.sampleDistrict;

    beforeEach(() => {
      jest.spyOn(postcodeService, 'fetchPostcodeDistrict').mockImplementationOnce(() => new Promise(resolve => resolve(sampleDistrict)));
    });

    describe('when postcode is valid', () => {
      beforeEach(() => {
        jest.spyOn(postcodeService, 'validatePostcode').mockImplementationOnce(() => true);
      });

      it('returns data about postcode', () => {
        expect.assertions(1);
        postcodeController
          .getPostcodeInfo({ postcode: samplePostcode })
          .then(result =>
            expect(result).toEqual({
              requestedPostcode: samplePostcode,
              district: sampleDistrict,
            }),
          );
      });
    });

    describe('when postcode is invalid', () => {
      beforeEach(() => {
        jest.spyOn(postcodeService, 'validatePostcode').mockImplementationOnce(() => false);
      });

      it('returns error', () => {
        expect.assertions(2);
        postcodeController
          .getPostcodeInfo({ postcode: 'Any invalid postcode' })
          .catch(error => {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toMatch(/Invalid postcode/);
          });
      });
    });
  });
});
