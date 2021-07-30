import { UUID } from '@boostercloud/framework-types'

export class Item {
  public constructor(
    public id: UUID,
    public field: string,
  ) {}
}
