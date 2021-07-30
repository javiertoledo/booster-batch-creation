import { ItemCreated } from '../events/item-created'
import { EventHandler, Booster } from '@boostercloud/framework-core'
import { Register } from '@boostercloud/framework-types'
import { BATCH_SIZE, ItemBuffer } from '../entities/item-buffer'
import { BatchCreated } from '../events/batch-created'
import { BufferClosed } from '../events/buffer-closed'


@EventHandler(ItemCreated)
export class CreateBatch {
  public static async handle(event: ItemCreated, register: Register): Promise<void> {
    // Every time an item is created, we check the buffer. 
    // If there's a completed batch, we trigger a BatchCreated event and a CloseBuffer event to reset it
    const buffer = await Booster.entity(ItemBuffer, 'item_buffer')
    if (buffer?.completedBatch && (buffer?.completedBatch?.length >= BATCH_SIZE)) {
      register.events(
        new BatchCreated(`${buffer.batchNumber}`, buffer.completedBatch),
        new BufferClosed(buffer.batchNumber)
      )
    }
  }
}
