import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import TokenService from '@/token/token.service';

@Injectable()
export default class AdminAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private tokenService: TokenService,
  ) {}

  private readonly logger = new Logger(AdminAuthGuard.name);
  private readonly ACCESS_TOKEN_SECRET = this.configService.get<string>(
    'ACCESS_TOKEN_SECRET',
  );

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = context.getArgByIndex(2);
    const request: Request = gqlCtx.req;
    const token = this.tokenService.getTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.ACCESS_TOKEN_SECRET,
      });

      request['user'] = payload;
      return payload.role === 'Admin';
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
