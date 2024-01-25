import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { Request } from 'express';
@Injectable()
export default class TokenService {
  constructor(private configService: ConfigService) {}

  extractToken(connectionParams: any): string | null {
    return connectionParams?.token || null;
  }

  validateToken(token: string): any {
    const accessTokenSecret = this.configService.get<string>(
      'ACCESS_TOKEN_SECRET',
    );
    try {
      return verify(token, accessTokenSecret);
    } catch (error) {
      return null;
    }
  }

  getTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.access_token;
  }
}
