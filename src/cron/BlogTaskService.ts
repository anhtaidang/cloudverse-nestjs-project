import { CURLService } from '@/services/curlService/curl.service';
import PrismaService from '@/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export default class BlogTaskService {
  constructor(
    private readonly prisma: PrismaService,
    private schedulerRegistry: SchedulerRegistry,
    private cUrlService: CURLService,
  ) {}

  private readonly logger = new Logger(BlogTaskService.name);

  @Cron(CronExpression.EVERY_DAY_AT_1AM, {
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

  //     EVERY_DAY_AT_7AM = "0 07 * * *",
  // @Cron('0 */5 07-09 * * *', {
  @Cron('0 */10 08-09 * * *', {
    // @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'spinDATVIETVAC',
  })
  async handleSpinDatVietVACCron() {
    this.logger.log('JOB spinDATVIETVAC is START');

    const data = [
      {
        key: 'anhtaidang',
        curl: `curl --location 'https://vie-access-api.datvietvac.vn/api/LuckyDraw/spin/spin' --header 'Accept: application/json, text/plain, */*' --header 'Accept-Language: en-US,en;q=0.9' --header 'Connection: keep-alive' --header 'Content-Type: application/json' --header 'Origin: https://vie-access.datvietvac.vn' --header 'Referer: https://vie-access.datvietvac.vn/' --header 'Sec-Fetch-Dest: empty' --header 'Sec-Fetch-Mode: cors' --header 'Sec-Fetch-Site: same-site' --header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0' --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGFpLmRhbmcuYW5oIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoidXNlciIsIk1lcmNoYW50IjoibjJrIiwiU2Vzc2lvbiI6ImE1ZjU1YTgyLWFhMWMtNGY5Yy04NzJiLWU5MTlkNGRmMzZiOCIsImV4cCI6MTczNjQ3NjkwMCwiaXNzIjoiRGF0VmlldFZBQyIsImF1ZCI6IkRhdFZpZXRWQUMifQ.DeTcrqhJDbFKZC_oY5c9LFdbaJcl4-EuSMxLAUACV9I' --header 'sec-ch-ua: "Microsoft Edge";v="129", "Not=A?Brand";v="8", "Chromium";v="129"' --header 'sec-ch-ua-mobile: ?0' --header 'sec-ch-ua-platform: "macOS"' --header 'Content-Length: 0' --data '{"user_name":"tai.dang.anh"}'`,
      },
      {
        key: 'khuongly',
        curl: `curl --location 'https://vie-access-api.datvietvac.vn/api/LuckyDraw/spin/spin' --header 'Accept: application/json, text/plain, */*' --header 'Accept-Language: en-US,en;q=0.9' --header 'Connection: keep-alive' --header 'Content-Type: application/json' --header 'Origin: https://vie-access.datvietvac.vn' --header 'Referer: https://vie-access.datvietvac.vn/' --header 'Sec-Fetch-Dest: empty' --header 'Sec-Fetch-Mode: cors' --header 'Sec-Fetch-Site: same-site' --header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0' --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoia2h1b25nLmx5IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoidXNlciIsIk1lcmNoYW50IjoibjJrIiwiU2Vzc2lvbiI6IjExNjBkNjdmLTRiNDAtNDczYy04YjY4LTQ0MDgzMzc4NTE2NyIsImV4cCI6MTczNjU2NDMwOCwiaXNzIjoiRGF0VmlldFZBQyIsImF1ZCI6IkRhdFZpZXRWQUMifQ.LJ2F3dWPj589kitV1wOx8QHL2wBCzrGABVG1RwU8Es4' --header 'sec-ch-ua: "Microsoft Edge";v="129", "Not=A?Brand";v="8", "Chromium";v="129"' --header 'sec-ch-ua-mobile: ?0' --header 'sec-ch-ua-platform: "macOS"' --header 'Content-Length: 0' --data '{"user_name":"khuong.ly"}'`,
      },
    ];

    data.forEach((d) => {
      this.logger.log(`EXEC cUrl KEY: ${d.key}`);
      this.cUrlService.executeCurlCommand(d.curl);
    });

    // const job = this.schedulerRegistry.getCronJob('spinDATVIETVAC');
    // this.logger.log('JOB spinDATVIETVAC is STOP');
    // job.stop();
  }
}
