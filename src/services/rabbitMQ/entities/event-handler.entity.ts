import { ObjectType } from '@nestjs/graphql';
import { MQEventTypeEnum } from '../enums/event-type.enum';

@ObjectType()
export class MQEventConsumer {
  eventType?: MQEventTypeEnum;
  data: any;
}
