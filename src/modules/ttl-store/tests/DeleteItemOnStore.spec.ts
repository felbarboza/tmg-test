import "reflect-metadata";
import { Item } from "../dtos/Item";
import { DeleteItemOnStoreService } from "../services/DeleteItemOnStore.service";
import { InsertNewItemOnStoreService } from "../services/InsertNewItemOnStore.service";

describe("DeleteItem Service", () => {
  let deleteItemService: DeleteItemOnStoreService;
  let insertItemService: InsertNewItemOnStoreService;
  let store: { [key: string]: any };

  beforeEach(() => {
    store = {};
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

    expect(store["name"]).toBe("John");

    deleteItemService.execute("name");

    expect(store["name"]).toBeUndefined();
  });

  it("should not return any error when trying to delete an item with non created key", () => {
    expect(deleteItemService.execute("name")).toBeUndefined();
  });
});
