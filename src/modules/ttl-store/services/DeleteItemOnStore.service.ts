import { inject, injectable } from "tsyringe";
import { Store } from "../provider";

@injectable()
export class DeleteItemOnStoreService {
  constructor(
    @inject("Store")
    private store: Store
  ) {}

  execute(key: string) {
    const item = this.store.get(key);
    if (item && item.timeoutId) {
      clearTimeout(item.timeoutId);
    }
    this.store.delete(key);
    return;
  }
}
