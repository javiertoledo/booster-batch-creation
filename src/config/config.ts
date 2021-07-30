import { Booster } from '@boostercloud/framework-core'
import { BoosterConfig } from '@boostercloud/framework-types'
import { Provider } from '@boostercloud/framework-provider-aws'

Booster.configure('local', (config: BoosterConfig): void => {
  config.appName = 'batching-events'
  config.providerPackage = '@boostercloud/framework-provider-local'
})

Booster.configure('production', (config: BoosterConfig): void => {
  config.appName = 'batching-events'
  config.provider = Provider()
})
