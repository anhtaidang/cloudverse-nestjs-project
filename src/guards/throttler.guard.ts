import { ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
// import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';

export class CustomThrottlerGuard extends ThrottlerGuard {
  logger = new Logger(CustomThrottlerGuard.name);
  canActivate(context: ExecutionContext, ): Promise<boolean> {

    const contextType = context.getType<'http' | 'rmq'>();

    // Do nothing if this is a RabbitMQ event
    //  if (isRabbitContext(context)) {
    if (contextType === 'rmq') {
      this.logger.log('===TRIGGER GLOBAL GUARD===',contextType);
      return new Promise(resolve => {
        resolve(true)
      });
    }
    this.logger.log('===TRIGGER GLOBAL GUARD===',contextType);
    return super.canActivate(context);
  }
}
