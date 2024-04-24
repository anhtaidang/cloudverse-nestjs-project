import { Injectable } from '@nestjs/common';

@Injectable()
export default class TestService {
  getHello(): string {
    return 'Test the World!';
  }
}
