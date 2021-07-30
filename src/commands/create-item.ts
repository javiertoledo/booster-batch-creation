import { Command } from '@boostercloud/framework-core'
import { Register, UUID } from '@boostercloud/framework-types'
import { ItemCreated } from '../events/item-created'

@Command({
  authorize: 'all'
})
export class CreateItem {
  public constructor(
    readonly itemId: UUID,
    readonly field: string,
  ) {}

  public static async handle(command: CreateItem , register: Register): Promise<void> {
    register.events(new ItemCreated(command.itemId, command.field))
  }
}
