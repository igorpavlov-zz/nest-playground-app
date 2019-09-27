import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGreeting(): string {
    return 'Welcome to Igor Pavlov\'s Nest Playground App';
  }
}
