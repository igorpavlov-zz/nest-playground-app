import { Injectable } from '@nestjs/common';

@Injectable()
export class PostcodeService {
  getGreeting(): string {
    return [
      'This endpoint uses external API calls',
      'It fetches data by a postcode and provides a human-readable representation of the place',
    ].join('. ');
  }
}
