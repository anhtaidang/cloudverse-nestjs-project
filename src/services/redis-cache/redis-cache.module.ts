import { Logger, Module } from '@nestjs/common';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { RedisCacheService } from './redis-cache.service';
import { redisStore } from 'cache-manager-redis-yet';
// import * as redisStore from 'cache-manager-redis-yet';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedislockModule } from './redis-lock/redis-lock.module';

@Module({
  imports: [
    RedislockModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: config.get('REDIS_HOST'),
            port: config.get('REDIS_PORT'),
          },
        });

        return {
          store: store as unknown as CacheStore,
          // host: config.get('REDIS_HOST'),
          // port: config.get('REDIS_PORT'),
          ttl: 3 * 60000, // 3 minutes (milliseconds)
        };
      },
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
