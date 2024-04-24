import { Controller, Get } from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import TestService from './test.service';

// @SkipThrottle()
@Controller('test')
export default class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  @SkipThrottle()
  getHello(): string {
    return this.testService.getHello();
  }

  // Override default configuration for Rate limiting and duration.
  @Throttle({ default: { limit: 5, ttl: 20000 } })
  @Get('find-all')
  findAll() {
    return 'List users works with custom rate limiting.';
  }
}
