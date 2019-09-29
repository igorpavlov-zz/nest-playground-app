import { Module, HttpModule } from '@nestjs/common';
import { PostcodeController } from './postcode.controller';
import { PostcodeService } from './postcode.service';

@Module({
  imports: [HttpModule],
  controllers: [PostcodeController],
  providers: [PostcodeService],
})
export class PostcodeModule {}
