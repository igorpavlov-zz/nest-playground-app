import { Module } from '@nestjs/common';
import { PostcodeModule } from './postcode/postcode.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PostcodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
