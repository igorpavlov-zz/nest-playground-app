import { Controller, Get, Header, Param, HttpException, HttpStatus } from '@nestjs/common';
import { PostcodeService } from './postcode.service';

@Controller()
export class PostcodeController {
  constructor(private readonly postcodeService: PostcodeService) {}

  @Get('/postcode')
  getGreeting(): string {
    return this.postcodeService.getGreeting();
  }

  @Get('/postcode/:postcode')
  @Header('Cache-Control', 'none')
  async getPostcodeInfo(@Param() params): Promise<object> {
    const postcode = params.postcode;

    if (!this.postcodeService.validatePostcode(postcode)) {
      throw new HttpException([
        'Invalid postcode',
        'A valid postcode example is SW1A0AA',
      ].join('. '), HttpStatus.BAD_REQUEST);
    }

    const district = await this.postcodeService.fetchPostcodeDistrict(postcode);

    return {
      requestedPostcode: params.postcode,
      district,
    };
  }
}
