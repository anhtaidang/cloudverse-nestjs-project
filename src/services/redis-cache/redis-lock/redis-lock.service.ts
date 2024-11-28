import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import Redlock, { Lock, ResourceLockedError } from 'redlock';

@Injectable()
export class RedisLockService implements OnModuleDestroy {
  private logger = new Logger(RedisLockService.name);
  constructor(@Inject('REDLOCK') private redlock: Redlock) {
    // Initialize Redlock with a single Redis instance or multiple instances for high availability
    // Handle Redlock errors
    this.redlock.on('error', (err) => {
      // Ignore cases where a resource is explicitly marked as locked on a client.
      // if (err instanceof ResourceLockedError) {
      //   this.logger.error('Redis Lock Client Error:', err);
      //   return;
      // }
    });
  }

  // Acquire a lock
  async acquireLock(
    resource: string,
    options: { ttl?: number; isLog?: boolean; version?: number },
  ): Promise<Lock> {
    // const lock = await this.redlock
    //   .acquire([resource], options?.ttl ?? 5000)
    //   .then((res) => {
    //     if (!!options?.isLog) {
    //       this.logger.debug(`[Lock][Acquired]: ${resource}`);
    //     }
    //     return res;
    //   })
    //   .catch((err) => {
    //     this.logger.error(`Failed to acquire lock ${options?.version}`, err);
    //     return null;
    //   });

    return this.redlock.acquire([resource], options?.ttl ?? 5000);
  }

  // Release a lock
  async releaseLock(lock: Lock, options?: { isLog?: boolean }): Promise<void> {
    try {
      await lock.release();
      if (!!options?.isLog) {
        this.logger.debug(`[Lock][Released]:: ${lock.resources.toString()}`);
      }
    } catch (err) {
      this.logger.error('Failed to release lock', err);
    }
  }

  // On module destroy, quit Redis connection
  async onModuleDestroy() {
    await this.redlock.quit();
  }
}
