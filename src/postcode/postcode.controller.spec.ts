import { Test, TestingModule } from '@nestjs/testing';
import { PostcodeController } from './postcode.controller';
import { PostcodeService } from './postcode.service';

describe('PostcodeController', () => {
  let postcodeController: PostcodeController;

  beforeEach(async () => {
    const postcode: TestingModule = await Test.createTestingModule({
      controllers: [PostcodeController],
      providers: [PostcodeService],
    }).compile();

    postcodeController = postcode.get<PostcodeController>(PostcodeController);
  });

  describe('root', () => {
    it('should start with "This endpoint"', () => {
      expect(postcodeController.getGreeting()).toMatch(/^This endpoint/);
    });
  });

  describe('postcode info', () => {
    const samplePostcode = 'SW1A0AA';
    let resultToBeTested;

    beforeEach(done => {
      postcodeController
        .getPostcodeInfo({ postcode: samplePostcode })
        .then(result => {
          resultToBeTested = result;

          done();
        });
    });

    it('returns data about postcode', () => {
      expect(resultToBeTested).toEqual({
        requestedPostcode: samplePostcode,
      });
    });
  });
});
