import "reflect-metadata";
import { Item } from "../dtos/Item";
import { InsertNewItemOnStoreService } from "../services/InsertNewItemOnStore.service";

describe("InsertItem Service", () => {
  let insertItemService: InsertNewItemOnStoreService;
  let store: { [key: string]: any };

  beforeEach(() => {
    store = {};
    insertItemService = new InsertNewItemOnStoreService(store);
  });

  it("should be able to insert an item", () => {
    const item: Item = {
      key: "name",
      value: "John",
      ttl: 1000,
    };

    insertItemService.execute(item);

    expect(store["name"]).toBe("John");
  });

  it("should be able to replace an existing item value when passing the same key", () => {
    const item: Item = {
      key: "name",
      value: "John",
      ttl: 1000,
    };

    insertItemService.execute(item);

    expect(store["name"]).toBe("John");

    const item2: Item = {
      key: "name",
      value: "Doe",
      ttl: 1000,
    };

    insertItemService.execute(item2);

    expect(store["name"]).toBe("Doe");
  });
});
