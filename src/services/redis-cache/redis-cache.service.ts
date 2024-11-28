import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RedisLockService } from './redis-lock/redis-lock.service';

export interface CachingConfig {
  ttl?: number | TtlFunction;
}

export interface TtlFunction {
  (result: any): number;
}

@Injectable()
export class RedisCacheService {
  private readonly logger = new Logger(RedisCacheService.name);

  private client = null;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly redisLockService: RedisLockService,
  ) {
    this.client = cacheManager;
    // @InjectRedis() private readonly redisClient: Redis,
    this.client.on('error', (e) => {
      this.logger.error(`Connect Redis resource Error: ${e}`);
    });
  }

  async getOrSetWithLock(
    key: string,
    fetchDataFn: () => Promise<any>,

    options?: {
      isHitCacheLog: boolean;
      ttl?: number;
      isLockLog?: boolean;
      version?: number;
      isHitFetchLog?: boolean;
    },
  ) {
    let lock;
    try {
      // Acquire the lock
      lock = await this.redisLockService.acquireLock(`lock:${key}`, {
        isLog: options?.isLockLog,
        version: options?.version,
      });

      const dataRedis = await this.get(key);

      if (dataRedis) {
        if (!!options?.isHitCacheLog) {
          const date = new Date();
          const milliseconds = date.getTime();
          this.logger.debug(
            `FROM [CACHE] ${key}, ${milliseconds}, ${dataRedis}`,
          );
        }

        return JSON.parse(dataRedis);
      }

      const dataDB = await fetchDataFn?.();

      if (!!options?.isHitFetchLog) {
        this.logger.debug(
          `FROM [DB] ${key}, ${options?.version ?? 0}, ${JSON.stringify(
            dataDB,
          )}`,
        );
      }

      if (dataDB) {
        this.set(key, JSON.stringify(dataDB), options?.ttl);
      }

      return dataDB;
    } catch (err) {
      this.logger.error(
        `Error during critical task: ${options?.version}, ${err.message}`,
      );
    } finally {
      // Release the lock
      if (lock) {
        await this.redisLockService.releaseLock(lock, {
          isLog: options?.isLockLog,
        });
      }
    }
  }

  // Set a value with a specific TTL
  async set(
    key: string,
    value: any,
    ttl?: number, //24 * 60 * 60 * 1000,
  ): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  // Get a value
  async get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  // Delete a value
  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  // Reset the cache
  async reset(): Promise<void> {
    this.logger.warn('Executed clear all cache!');
    await this.cacheManager.reset();
  }
}
