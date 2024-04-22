import { PrismaClientOptions } from '@prisma/client/runtime/library'

export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export const PRISMA_LOG_CONFIG: Array<LogDefinition> = [
  { level: 'query', emit: 'event' },
  { level: 'warn', emit: 'event' },
  { level: 'info', emit: 'event' },
  { level: 'error', emit: 'event' },
]

export const PRISMA_CLIENT_OPTIONS: PrismaClientOptions = {
  log: PRISMA_LOG_CONFIG,
  // rejectOnNotFound: true,
  errorFormat: 'pretty',

  // For development
  // __internal: {
  //   debug: true,
  //   hooks: {
  //     beforeRequest: (params) => {
  //       // Do something
  //     },
  //   },
  // },
}
