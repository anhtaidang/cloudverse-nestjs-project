import {
  INestApplication,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_CLIENT_OPTIONS } from './prisma.config';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';

@Injectable()
export default class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      ...PRISMA_CLIENT_OPTIONS,
    });
  }
  async onModuleInit() {
    await this.$connect().catch((error: PrismaClientInitializationError) => {
      this.logger.error(
        `🆘 Prisma failed to connect master url: ${process.env.DATABASE_URL.replace(
          process.env.DB_PASSWORD,
          '*****',
        )} - Error code: ${error.errorCode} - Client version: ${
          error.clientVersion
        }`,
      );
      // ? Throw error to make sure below event listernners won't be registered
      throw error;
    });
    this.logger.log(
      `🚀 Prisma connected master url: ${process.env.DATABASE_URL.replace(
        process.env.DB_PASSWORD,
        '*****',
      )}`,
    );

    // @ts-ignore
    this.$on('info', (e) => {
      this.logger.log(e);
    });

    // @ts-ignore
    this.$on('warn', (e) => {
      this.logger.warn(e);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}
