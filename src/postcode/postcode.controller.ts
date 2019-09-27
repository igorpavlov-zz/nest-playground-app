import { Controller, Get, Header, Param } from '@nestjs/common';
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
    return {
      requestedPostcode: params.postcode,
    };
  }
}
