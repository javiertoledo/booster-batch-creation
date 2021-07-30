# Batching events in Booster

This project comes from a question in the Booster's Discord channel. This code takes eventual consistence into account, taking advantage of Booster's default sharding capabilities to build batches of items on the fly without external transactional counters (which would limit the throughput significantly). It is intended only as a proof-of-concept. It hasn't been tested and should only be used at your own risk.

To solve this problem we do the following things:

1. The `CreateItem` command registers `EventCreated` events.
2. The `EventCreated` events are reduced and accumulated as `Item` instances in the `ItemBuffer` "singleton entity".
3. The `EventCreated` events also trigger the `UpdateBatch` event handler.
4. The `UpdateBatch` event handler checks the current state of the `ItemBuffer` singleton entity. If there's a completed batch, it register a `BatchCreated` and a `CloseBuffer` events.
5. The `BatchCreated` event creates a new `Batch` entity including all the items buffered to that point, which is then projected to the `BatchReadModel` and becomes readable via API.
6. The `CloseBuffer` event "resets" the buffer, deleting the completed batch and increase the batch counter.

Improvements and suggestions are more than welcome!