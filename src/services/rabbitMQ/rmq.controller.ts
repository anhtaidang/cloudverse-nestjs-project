import { Controller } from '@nestjs/common'
import { RMQService } from './rmq.service'

@Controller()
export class RMQController {
  constructor(private readonly rmqService: RMQService) {}
}
