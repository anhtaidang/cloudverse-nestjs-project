import { MQEventTypeEnum } from '../enums/event-type.enum';

export interface MQResponseMessageInterface {
  error?: string;
  eventType: MQEventTypeEnum;
  data?: any;
}
