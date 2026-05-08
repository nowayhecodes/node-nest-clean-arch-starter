import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { EventTypes } from '~/shared/domain/events/event-types'
import { IEventHandler } from '~/shared/infra/contracts/event-handler'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'
import { Inject } from '@nestjs/common'

/**
 * OWASP A09 — Security Logging and Monitoring.
 * GDPR Art. 25 — Data Protection by Design.
 *
 * Listens to all security-relevant domain events and writes structured
 * audit log entries using NestJS Logger.  In production these entries
 * should be forwarded to a centralised SIEM / log aggregator.
 */
@Injectable()
export class AuditLogService implements OnModuleInit {
  private readonly logger = new Logger(AuditLogService.name)

  constructor(
    @Inject(SharedProviderEnum.EVENT_HANDLER)
    private readonly eventHandler: IEventHandler,
  ) {}

  onModuleInit() {
    this.eventHandler.listen({
      key: EventTypes.ACCOUNT_CONFIRMATION,
      handler: async (payload: { email: string }) => {
        this.log(EventTypes.ACCOUNT_CONFIRMATION, { email: payload.email })
      },
    })

    this.eventHandler.listen({
      key: EventTypes.RESET_PASSWORD,
      handler: async (payload: { email: string }) => {
        this.log(EventTypes.RESET_PASSWORD, { email: payload.email })
      },
    })

    this.eventHandler.listen({
      key: EventTypes.ACCOUNT_DELETED,
      handler: async (payload: { userId: string }) => {
        this.log(EventTypes.ACCOUNT_DELETED, { userId: payload.userId })
      },
    })

    this.eventHandler.listen({
      key: EventTypes.WELCOME,
      handler: async (payload: { email: string }) => {
        this.log(EventTypes.WELCOME, { email: payload.email })
      },
    })
  }

  private log(event: string, context: Record<string, unknown>) {
    this.logger.log(
      JSON.stringify({
        audit: true,
        event,
        ts: new Date().toISOString(),
        ...context,
      }),
    )
  }
}
