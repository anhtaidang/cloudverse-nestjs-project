import { DynamicModule, Module } from '@nestjs/common'
import { RMQService } from './rmq.service'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { RMQController } from './rmq.controller'

export const rabbitMqModule: DynamicModule = RabbitMQModule.forRoot(
  RabbitMQModule,
  {
    // uri: `${process.env.RABBITMQ_PROTOCOL}://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
    uri: process.env.RABBITMQ_URL,
    exchanges: [
      {
        name: process.env.RABBITMQ_JOB_TRIGGER_DATA_EXCHANGE,
        type: 'fanout',
        options: {
          durable: false,
        },
      },
      // {
      //   name: process.env.RABBITMQ_POLICY_EXCHANGE,
      //   type: 'fanout',
      //   options: {
      //     durable: false,
      //   },
      // },
    ],
    connectionInitOptions: { wait: false },
    connectionManagerOptions: {
      connectionOptions: {
        keepAlive: true,
      },
    },
  },
)

@Module({
  imports: [rabbitMqModule],
  controllers: [RMQController],
  providers: [RMQService],
  exports: [rabbitMqModule, RMQService],
})
export class RMQModule {}
