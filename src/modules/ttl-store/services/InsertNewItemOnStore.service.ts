import { inject, injectable } from "tsyringe";
import { Item } from "../dtos/Item";
import { Store } from "../provider";

@injectable()
export class InsertNewItemOnStoreService {
  constructor(
    @inject("Store")
    private store: Store
  ) {}

  execute(item: Item) {
    const previousItem = this.store.get(item.key);

    if (previousItem && previousItem.timeoutId) {
      clearTimeout(previousItem.timeoutId);
    }

    let timeoutId = undefined;

    if (item.ttl) {
      timeoutId = setTimeout(() => {
        this.store.delete(item.key);
      }, item.ttl);
    }

    this.store.set(item.key, {
      value: item.value,
      timeoutId,
    });
  }
}
