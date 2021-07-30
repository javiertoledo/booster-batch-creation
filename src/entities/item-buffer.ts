import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { Item } from '../common/item'
import { BufferClosed } from '../events/buffer-closed'
import { ItemCreated } from '../events/item-created'

export const ITEM_BUFFER_ID = 'item_buffer'
export const BATCH_SIZE = 100

@Entity
export class ItemBuffer {
  public constructor(
    public id: UUID,
    readonly batchNumber: number,
    readonly completedBatch: Array<Item>, // This holds a pending batch until it is created
    readonly fillingBatch: Array<Item>, // This buffers the next batch while the completed one is processed
  ) {}

  @Reduces(ItemCreated)
  public static reduceItemCreated(event: ItemCreated, currentItemBuffer?: ItemBuffer): ItemBuffer {
    const batchNumber = currentItemBuffer?.batchNumber ?? 0
    let fillingBatch = currentItemBuffer?.fillingBatch ?? []
    let completedBatch = currentItemBuffer?.completedBatch ?? []
    
    const item = new Item(event.id, event.field)

    if (fillingBatch.length >= BATCH_SIZE) {
      completedBatch = fillingBatch
      fillingBatch = [item]
    } else {
      fillingBatch.push(item)
    }

    return new ItemBuffer(
      ITEM_BUFFER_ID,
      batchNumber,
      completedBatch,
      fillingBatch
    )
  }

  @Reduces(BufferClosed)
  public static reduceCloseBatch(event: BufferClosed, currentItemBuffer?: ItemBuffer): ItemBuffer {
    if (currentItemBuffer?.batchNumber === event.batchNumber) {
      // We flush the completedBatch and increase the batch counter
      return new ItemBuffer(
        ITEM_BUFFER_ID,
        currentItemBuffer.batchNumber + 1,
        [], 
        currentItemBuffer.fillingBatch
      )  
    } else {
      return currentItemBuffer ?? new ItemBuffer(ITEM_BUFFER_ID, 0, [], [])
    }
  }
  
}
