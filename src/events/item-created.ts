import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { ITEM_BUFFER_ID } from '../entities/item-buffer'

@Event
export class ItemCreated {
  public constructor(
    readonly id: UUID,
    readonly field: string,
  ) {}

  public entityID(): UUID {
    return ITEM_BUFFER_ID // A static id forces all events to be processed by a single shard
  }
}
