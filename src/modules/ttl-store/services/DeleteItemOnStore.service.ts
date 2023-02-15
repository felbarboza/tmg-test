import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteItemOnStoreService {
  constructor(
    @inject("Store")
    private store: { [key: string]: any }
  ) {}

  execute(key: string) {
    delete this.store[key];
    return;
  }
}
