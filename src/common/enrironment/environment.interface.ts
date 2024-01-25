import { GqlModuleOptions } from '@nestjs/graphql';

export interface IEnvironment {
  readonly siteUrl?: string;
  readonly isDevelopment: boolean;
  readonly isProduction: boolean;
  readonly graphql?: GqlModuleOptions;
}
