import { ReadModel, Projects } from '@boostercloud/framework-core'
import { UUID, ProjectionResult } from '@boostercloud/framework-types'
import { Item } from '../common/item'
import { Batch } from '../entities/batch'

@ReadModel({
  authorize: // Specify authorized roles here. Use 'all' to authorize anyone
})
export class BatchReadModel {
  public constructor(
    public id: UUID,
    readonly items: Array<Item>,
  ) {}

  @Projects(Batch, "id")
  public static projectBatch(entity: Batch): ProjectionResult<BatchReadModel> {
    return new BatchReadModel(entity.id, entity.items)
  }

}
