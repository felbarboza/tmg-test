import { inject, injectable } from "tsyringe";
import { Store } from "../provider";

@injectable()
export class RetrieveItemFromStoreService {
  constructor(
    @inject("Store")
    private store: Store
  ) {}

  execute(key: string): string | number | undefined {
    const item = this.store.get(key);
    if (item) {
      return item.value;
    }
  }
}
