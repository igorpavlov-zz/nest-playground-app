import { Module } from '@nestjs/common';
import { PostcodeController } from './postcode.controller';
import { PostcodeService } from './postcode.service';

@Module({
  imports: [],
  controllers: [PostcodeController],
  providers: [PostcodeService],
})
export class PostcodeModule {}
