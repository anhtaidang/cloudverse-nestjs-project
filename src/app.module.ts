import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import BlogModule from './modules/blog/blog.module';
import PermissionRoleModule from './modules/permissionRole/permissionRole.module';
import AuthModule from './modules/auth/auth.module';
import TokenService from './token/token.service';
import BlogTaskService from './cron/BlogTaskService';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLError } from 'graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule, AppModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: async (
        configService: ConfigService,
        tokenService: TokenService,
      ) => {
        return {
          installSubscriptionHandlers: true,
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          subscriptions: {
            'graphql-ws': true,
            'subscriptions-transport-ws': true,
          },
          onConnect: (connectionParams) => {
            const token = tokenService.extractToken(connectionParams);
            console.log('connectionParams');
            if (!token) {
              throw new Error('Token not provided');
            }
            const user = tokenService.validateToken(token);
            if (!user) {
              throw new Error('Invalid token');
            }
            return { user };
          },
          context: ({ req, res }) => {
            return { req, res };
          },
          formatError: (error) => {
            const originalError = error.extensions
              ?.originalError as GraphQLError;

            if (!originalError) {
              return {
                message: error.message,
                code: error.extensions?.code,
              };
            }
            return {
              message: originalError.message,
              code: error.extensions?.code,
            };
          },
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    PermissionRoleModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService, TokenService, PrismaModule, BlogTaskService],
})
export class AppModule {}
