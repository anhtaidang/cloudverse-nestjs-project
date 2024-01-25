import PrismaService from '@/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export default class BlogTaskService {
  constructor(
    private readonly prisma: PrismaService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  private readonly logger = new Logger(BlogTaskService.name);

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'getBlogSchedule',
  })
  async handleCron() {
    const data = await this.prisma.blog.findMany();
    if (data.length === 0) {
      const response = await fetch('https://dummyapi.online/api/blogposts');
      const results = await response.json();

      this.logger.log('Cron Action');
      this.logger.log(results);
      if (results) {
        await this.prisma.blog.createMany({
          data: results.map((m) => ({
            title: m.title,
            author: m.author,
            datePublished: m.date_published,
            content: m.content,
          })),
        });
      }

      const job = this.schedulerRegistry.getCronJob('getBlogSchedule');
      this.logger.log('JOB getBlogSchedule is STOP');
      job.stop();
    }
  }
}
