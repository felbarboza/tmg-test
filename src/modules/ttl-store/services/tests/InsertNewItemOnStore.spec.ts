import "reflect-metadata";
import { Item } from "../../dtos/Item";
import { Store } from "../../provider";
import { InsertNewItemOnStoreService } from "../InsertNewItemOnStore.service";

describe("InsertItem Service", () => {
  let insertItemService: InsertNewItemOnStoreService;
  let store: Store;

  beforeEach(() => {
    store = new Map();
    insertItemService = new InsertNewItemOnStoreService(store);
  });

  it("should be able to insert an item", () => {
    const item: Item = {
      key: "name",
      value: "John",
      ttl: 1000,
    };

    insertItemService.execute(item);

    expect(store.get("name")?.value).toBe("John");
  });

  it("should be able to replace an existing item value when passing the same key", () => {
    const item: Item = {
      key: "name",
      value: "John",
      ttl: 1000,
    };

    insertItemService.execute(item);

    expect(store.get("name")?.value).toBe("John");

    const item2: Item = {
      key: "name",
      value: "Doe",
      ttl: 1000,
    };

    insertItemService.execute(item2);

    expect(store.get("name")?.value).toBe("Doe");
  });
});
