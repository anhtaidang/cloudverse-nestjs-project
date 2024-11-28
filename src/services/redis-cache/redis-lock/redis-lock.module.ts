import { Module, Provider } from '@nestjs/common';
import Client from 'ioredis';
import Redlock from 'redlock';
import { RedisLockService } from './redis-lock.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

const RedlockProvider = {
  provide: 'REDLOCK',
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const redisAClient = new Client({
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
    });

    return new Redlock(
      [redisAClient],
      // {
      //   retryCount: 5, // Number of retry attempts
      //   retryDelay: 200, // Time between retries in ms
      //   retryJitter: 100, // Random time added to retries
      // },
      {
        // The expected clock drift; for more details see:
        // http://redis.io/topics/distlock
        driftFactor: 0.01, // multiplied by lock ttl to determine drift time

        // The max number of times Redlock will attempt to lock a resource
        // before erroring.
        retryCount: 20,

        // the time in ms between attempts
        retryDelay: 500, // time in ms

        // the max time in ms randomly added to retries
        // to improve performance under high contention
        // see https://www.awsarchitectureblog.com/2015/03/backoff.html
        retryJitter: 200, // time in ms

        // The minimum remaining time on a lock before an extension is automatically
        // attempted with the `using` API.
        automaticExtensionThreshold: 500, // time in ms
      },
    );
  },
} as Provider;

@Module({
  controllers: [],
  providers: [RedisLockService, RedlockProvider],
  exports: [RedisLockService, RedlockProvider],
})
export class RedislockModule {}
