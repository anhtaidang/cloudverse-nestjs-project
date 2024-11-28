import amqplib from 'amqplib';
import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { IEventPublish } from '@/common/interfaces/event.interface';
import { MQResponseMessageInterface } from './types';

@Injectable()
export class RMQService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  private readonly SERVICE_NAME = RMQService.name;
  private readonly logger = new Logger(this.SERVICE_NAME);

  @RabbitSubscribe({
    exchange: process.env.RABBITMQ_JOB_TRIGGER_DATA_EXCHANGE,
    routingKey: '',
    queue: process.env.RABBITMQ_JOB_TRIGGER_DATA_QUEUE,
    queueOptions: {
      durable: true,
    },
  })
  async eventHandler(msg: MQResponseMessageInterface) {
    this.logger.log({
      describe: 'RABBITMQ_JOB_TRIGGER_DATA_EXCHANGE',
      msg: JSON.stringify(msg),
    });
  }

  public async publish(
    exchange: string,
    routingKey: string,
    message: MQResponseMessageInterface,
    options?: amqplib.Options.Publish,
  ) {
    this.logger.log(
      `PUBLISH INFO:`,
      exchange,
      routingKey,
      JSON.stringify(message),
    );
    await this.amqpConnection.publish(exchange, routingKey, message, options);
  }

  /**
   * It publishes an event to the RabbitMQ server
   * @param {IEventPublish} eventPublish - IEventPublish
   */
  publishEvent(eventPublish: IEventPublish) {
    const { exchange, routingKey, message, options } = eventPublish;
    try {
      this.logger.log(
        `PUBLISH INFO:`,
        exchange,
        routingKey,
        JSON.stringify(message),
      );
      this.amqpConnection.publish(exchange, routingKey, message, options);
    } catch (error) {
      this.logger.error(error);
    }
    this.logger.log(message, this.publishEvent.name);
  }
}
