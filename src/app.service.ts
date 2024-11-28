import { Injectable, Logger } from '@nestjs/common';
import { CURLService } from './services/curlService/curl.service';
import { RedisCacheService } from './services/redis-cache/redis-cache.service';
import { RedisLockService } from './services/redis-cache/redis-lock/redis-lock.service';
import { RMQService } from './services/rabbitMQ/rmq.service';
import { MQEventTypeEnum } from './services/rabbitMQ/enums/event-type.enum';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private count = 0;
  constructor(
    private readonly cUrlService: CURLService,
    private readonly redisLockService: RedisLockService,
    private readonly redisCacheService: RedisCacheService,
    private readonly rmqService: RMQService,
  ) {}

  getClearCache() {
    this.redisCacheService.reset();
    this.count = 0;
    return 'Clear cache succcessfull!';
  }

  async getHello() {
    this.rmqService.publish(
      process.env.RABBITMQ_JOB_TRIGGER_DATA_EXCHANGE,
      '',
      { eventType: MQEventTypeEnum.TRIGGER_BLOG_ADD, data: null },
    );

    const result = await this.cUrlService.executeCurlCommand(
      `curl -X GET "https://dummyapi.online/api/blogposts"`,
    );

    const data = await this.getTicketItemFromDBByIVip(1, new Date().getTime());

    return { data, result };
  }

  private genTicketItemKey(id) {
    return `TICKET:ITEM:${id}`;
  }

  async getTicketItemFromDBByIVip(id: number, version: number) {
    const findDB = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.count += 1;
          const data = { ticket: id, count: this.count };
          resolve(data);
        }, 1000);
      }); // Simulate work
    };

    const data = await this.redisCacheService.getOrSetWithLock(
      this.genTicketItemKey(id),
      findDB,
      { isHitCacheLog: true, isHitFetchLog: true, version },
    );

    // this.logger.log(`DONE REQUEST ${version}: ${JSON.stringify(data)}`);

    return { data };
  }
}
