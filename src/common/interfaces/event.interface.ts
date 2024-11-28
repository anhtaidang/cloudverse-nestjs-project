import { MQResponseMessageInterface } from '@/services/rabbitMQ/types';
import amqplib from 'amqplib';

export interface IEventPublish {
  exchange: string;
  queue?: string;
  message?: IEventDataPublish;
  routingKey?: string;
  options?: amqplib.Options.Publish;
}

export interface IEventDataPublish extends MQResponseMessageInterface {}
