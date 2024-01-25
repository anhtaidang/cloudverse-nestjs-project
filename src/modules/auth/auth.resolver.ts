import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { LoginResponse, RegisterResponse } from './auth.model';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  UseFilters,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GraphQLErrorFilter } from '@/filters/custom-exception';
import AuthRegisterDTO from './dto/authRegister.dto';
import AuthLoginDto from './dto/authLogin.dto';
import AuthService from './auth.service';

@UseFilters(GraphQLErrorFilter)
@Resolver()
export default class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterResponse)
  public async register(
    @Args('authRegister') authRegister: AuthRegisterDTO,
    @Context() context: { res: Response },
  ) {
    try {
      if (authRegister.password !== authRegister.confirmPassword) {
        throw new BadRequestException({
          confirmPassword: 'Password and confirm password are not the same.',
        });
      }
      const user = await this.authService.register(authRegister, context.res);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginDto: AuthLoginDto,
    @Context() context: { res: Response },
  ) {
    try {
      return this.authService.login(loginDto, context.res);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Mutation(() => String)
  public async logout(@Context() context: { res: Response }) {
    try {
      return this.authService.logout(context.res);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Mutation(() => String)
  public async refreshToken(
    @Context() context: { req: Request; res: Response },
  ) {
    try {
      return this.authService.refreshToken(context.req, context.res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
