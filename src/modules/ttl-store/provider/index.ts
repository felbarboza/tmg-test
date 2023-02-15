import { container } from "tsyringe";

interface StoreItem {
  value: string | number;
  timeoutId?: NodeJS.Timeout;
}

export type Store = Map<string, StoreItem>;

const store = new Map<string, StoreItem>();

container.registerInstance("Store", store);
