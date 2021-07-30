import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { Item } from '../common/item'

@Event
export class BatchCreated {
  public constructor(
    readonly id: UUID,
    readonly items: Array<Item>,
  ) {}

  public entityID(): UUID {
    return this.id
  }
}
