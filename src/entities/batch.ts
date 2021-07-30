import { Entity, Reduces } from '@boostercloud/framework-core'
import { UUID } from '@boostercloud/framework-types'
import { Item } from '../common/item'
import { BatchCreated } from '../events/batch-created'

@Entity
export class Batch {
  public constructor(
    public id: UUID,
    readonly items: Array<Item>,
  ) {}

  @Reduces(BatchCreated)
  public static reduceCreateBatch(batchCreatedEvent: BatchCreated): Batch {
    return new Batch(batchCreatedEvent.id, batchCreatedEvent.items)
  }
}
