import PrismaService from '@/prisma.service';
import PrismaSelectService from '@/prismaSelect.service';
import { Injectable } from '@nestjs/common';
import { PermissionRole, Prisma, UserRoleMap } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';

@Injectable()
export default class PermissionRoleService {
  constructor(
    private readonly prismaSelectService: PrismaSelectService,
    private readonly prisma: PrismaService,
  ) {}

  public async create<T extends Prisma.PermissionRoleCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PermissionRoleCreateArgs>,
  ): Promise<PermissionRole> {
    return this.prisma.permissionRole.create(args);
  }

  public async findMany<T extends Prisma.PermissionRoleFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PermissionRoleFindManyArgs>,
  ): Promise<PermissionRole[]> {
    return this.prisma.permissionRole.findMany(args);
  }

  public async update<T extends Prisma.PermissionRoleUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PermissionRoleUpdateArgs>,
  ): Promise<PermissionRole> {
    return this.prisma.permissionRole.update(args);
  }

  public async findOne<T extends Prisma.PermissionRoleFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PermissionRoleFindUniqueArgs>,
    info?: GraphQLResolveInfo,
  ): Promise<PermissionRole> {
    const select = this.prismaSelectService.getValue(info);
    return this.prisma.permissionRole.findUnique({ ...select, ...args });
  }

  public async createUserRoleMap<T extends Prisma.UserRoleMapCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserRoleMapCreateArgs>,
  ): Promise<UserRoleMap> {
    return this.prisma.userRoleMap.create(args);
  }
}
