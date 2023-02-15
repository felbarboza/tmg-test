import { inject, injectable } from "tsyringe";

@injectable()
export class RetrieveItemFromStoreService {
  constructor(
    @inject("Store")
    private store: { [key: string]: any }
  ) {}

  execute(key: string): string | number | undefined {
    return this.store[key];
  }
}
