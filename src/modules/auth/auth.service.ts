import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import PrismaService from '@/prisma.service';
import PermissionRoleService from '@/modules/permissionRole/permissionRole.service';
import AuthLoginDto from './dto/authLogin.dto';
import AuthRegisterDTO from './dto/authRegister.dto';

@Injectable()
export default class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly permissionRoleService: PermissionRoleService,
  ) {}

  private readonly ACCESS_TOKEN = this.configService.get<string>(
    'ACCESS_TOKEN_SECRET',
  );
  private readonly REFRESH_TOKEN = this.configService.get<string>(
    'REFRESH_TOKEN_SECRET',
  );

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    let payload;

    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.REFRESH_TOKEN,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    const userExists = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!userExists) {
      throw new BadRequestException('User no longer exists');
    }

    const expiresIn = 15000;
    const expiration = Math.floor(Date.now() / 1000) + expiresIn;
    const accessToken = this.jwtService.sign(
      { ...payload, exp: expiration },
      {
        secret: this.ACCESS_TOKEN,
      },
    );
    res.cookie('access_token', accessToken, { httpOnly: true });

    return accessToken;
  }

  private async assignTokens(user: User, response: Response) {
    const result = await this.prisma.userRoleMap.findFirst({
      where: { userId: user.id },
      include: { role: { select: { nameRole: true } } },
    });

    const payload = {
      username: user.fullName,
      sub: user.id,
      role: result.role.nameRole,
    };

    this.logger.log('ACCESS_TOKEN_SECRET', this.ACCESS_TOKEN);
    this.logger.log('REFRESH_TOKEN_SECRET', this.REFRESH_TOKEN);

    const accessToken = this.jwtService.sign(payload, {
      secret: this.ACCESS_TOKEN,
      expiresIn: '300sec',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.REFRESH_TOKEN,
      expiresIn: '7d',
    });

    response.cookie('access_token', accessToken, { httpOnly: true });
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
    });

    return { user, role: result.role.nameRole };
  }

  async validateUser(loginDto: AuthLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return user;
    }
    return null;
  }

  async register(registerDto: AuthRegisterDTO, response: Response) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new BadRequestException({ email: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        fullName: registerDto.fullName,
        password: hashedPassword,
        email: registerDto.email,
        username: registerDto.email,
      },
    });

    if (user) {
      const userRoleMap = await this.permissionRoleService.createUserRoleMap({
        data: {
          roleId: registerDto.roleId,
          userId: user.id,
        },
      });
      if (!userRoleMap) {
        await this.prisma.user.delete({
          where: { id: user.id },
        });
        throw new BadRequestException({
          email: 'Set user role not successfully',
        });
      }
    }

    return this.assignTokens(user, response);
  }

  async login(loginDto: AuthLoginDto, response: Response) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new BadRequestException({
        invalidCredentials: 'Invalid credentials',
      });
    }

    return this.assignTokens(user, response);
  }

  async logout(response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
    return 'Successfully logged out';
  }
}
