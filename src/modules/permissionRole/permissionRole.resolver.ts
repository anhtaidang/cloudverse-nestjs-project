import { HttpException, HttpStatus, Logger, UseFilters } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Info } from '@nestjs/graphql';
import PermissionRoleService from './permissionRole.service';
import {
  PermissionRoleCreateInput,
  PermissionRoleUpdateInput,
  PermissionRoleWhereInput,
  PermissionRoleWhereUniqueInput,
} from './dto';
import { GraphQLErrorFilter } from '@/filters/custom-exception';
import { PermissionRole } from './permissionRole.model';
import { GraphQLResolveInfo } from 'graphql';

@Resolver((of) => PermissionRole)
export default class PermissionRoleResolver {
  private readonly logger = new Logger(PermissionRoleResolver.name);
  constructor(private readonly PermissionRoleService: PermissionRoleService) {}

  @UseFilters(GraphQLErrorFilter)
  @Mutation(() => PermissionRole)
  public async createPermissionRole(
    @Args('data') data: PermissionRoleCreateInput,
  ): Promise<PermissionRole> {
    try {
      return await this.PermissionRoleService.create({ data });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseFilters(GraphQLErrorFilter)
  @Mutation(() => PermissionRole)
  public async updatePermissionRole(
    @Args('data') data: PermissionRoleUpdateInput,
    @Args('where') where: PermissionRoleWhereUniqueInput,
  ): Promise<PermissionRole> {
    try {
      return await this.PermissionRoleService.update({ data, where });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseFilters(GraphQLErrorFilter)
  @Query(() => PermissionRole)
  public async permissionRole(
    @Args('where') where: PermissionRoleWhereUniqueInput,
    @Info() info?: GraphQLResolveInfo,
  ): Promise<PermissionRole> {
    try {
      this.logger.log(`Getting one PermissionRole`);
      return this.PermissionRoleService.findOne({ where }, info);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseFilters(GraphQLErrorFilter)
  @Query(() => [PermissionRole])
  public async permissionRoles(
    @Args('where') where: PermissionRoleWhereInput,
  ): Promise<PermissionRole[]> {
    try {
      this.logger.log(`Getting a list of PermissionRoles`);
      return this.PermissionRoleService.findMany({ where });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
