import { Event } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { ITEM_BUFFER_ID } from '../entities/item-buffer'

@Event
export class BufferClosed {
  public constructor(
    readonly batchNumber: number,
  ) {}

  public entityID(): UUID {
    return ITEM_BUFFER_ID
  }
}
