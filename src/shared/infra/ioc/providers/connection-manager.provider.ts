import { Provider } from '@nestjs/common'
import { ConnectionManager } from '~/shared/infra/database/typeorm/manager/connection.manager'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class ConnectionManagerProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.CONNECTION_MANAGER,
      useFactory: (): ConnectionManager => {
        return ConnectionManager.getInstance()
      },
      inject: [],
    }
  }
}
