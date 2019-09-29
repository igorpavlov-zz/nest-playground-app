import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class PostcodeService {
  constructor(private readonly httpService: HttpService) {}

  getGreeting(): string {
    return [
      'This endpoint uses external API calls',
      'It fetches data by a postcode and provides a human-readable representation of the place',
    ].join('. ');
  }

  validatePostcode(postcode: string): boolean {
    // @SEE https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/488478/Bulk_Data_Transfer_-_additional_validation_valid_from_12_November_2015.pdf
    // @NOTE We made white spaces optional by replacing them with "\s?"
    const postcodeValidationRegexp = /^([Gg][Ii][Rr]\s?0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/;

    return postcodeValidationRegexp.test(postcode);
  }

  fetchPostcodeDistrict(postcode: string): Promise<string> {
    return this
      .httpService
      .get(`https://api.postcodes.io/postcodes/${postcode}`)
      .toPromise()
      .then(response => response.data.result.admin_district);
  }
}
