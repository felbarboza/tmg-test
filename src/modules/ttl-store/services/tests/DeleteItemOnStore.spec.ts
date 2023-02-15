import "reflect-metadata";
import { Item } from "../../dtos/Item";
import { Store } from "../../provider";
import { DeleteItemOnStoreService } from "../DeleteItemOnStore.service";
import { InsertNewItemOnStoreService } from "../InsertNewItemOnStore.service";

describe("DeleteItem Service", () => {
  let deleteItemService: DeleteItemOnStoreService;
  let insertItemService: InsertNewItemOnStoreService;
  let store: Store;

  beforeEach(() => {
    store = new Map();
    deleteItemService = new DeleteItemOnStoreService(store);
    insertItemService = new InsertNewItemOnStoreService(store);
  });

  it("should be able to delete an item", () => {
    const item: Item = {
      key: "name",
      value: "John",
      ttl: 1000,
    };

    insertItemService.execute(item);

    expect(store.get("name")?.value).toBe("John");

    deleteItemService.execute("name");

    expect(store.get("name")?.value).toBeUndefined();
  });

  it("should not return any error when trying to delete an item with non created key", () => {
    expect(deleteItemService.execute("name")).toBeUndefined();
  });
});
