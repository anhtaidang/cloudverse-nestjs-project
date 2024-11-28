import { Module } from '@nestjs/common';
import { CURLService } from './curl.service';

@Module({
  imports: [],
  providers: [CURLService],
  exports: [CURLService],
})
export default class CURLModule {}
