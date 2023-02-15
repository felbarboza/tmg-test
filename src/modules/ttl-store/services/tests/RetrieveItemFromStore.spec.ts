import "reflect-metadata";
import { Item } from "../../dtos/Item";
import { Store } from "../../provider";
import { InsertNewItemOnStoreService } from "../InsertNewItemOnStore.service";
import { RetrieveItemFromStoreService } from "../RetrieveItemFromStore.service";

describe("RetrieveItem Service", () => {
  let retrieveItemService: RetrieveItemFromStoreService;
  let store: Store;

  beforeEach(() => {
    store = new Map();
    retrieveItemService = new RetrieveItemFromStoreService(store);
  });

  it("should be able to retrieve an item", () => {
    store.set("name", {
      value: "John",
    });
    store.set("age", {
      value: 12,
    });

    const nameItem = retrieveItemService.execute("name");
    const ageItem = retrieveItemService.execute("age");

    expect(nameItem).toBe("John");
    expect(ageItem).toBe(12);
  });

  it("should retrieve undefined if the store is empty", () => {
    const noItem = retrieveItemService.execute("name");

    expect(noItem).toBeUndefined();
  });

  it("should retrieve undefined if the ttl of the item has passed", () => {
    jest.useFakeTimers();

    const item: Item = {
      key: "name",
      value: "John",
      ttl: 3000,
    };

    const insertNewItemService = new InsertNewItemOnStoreService(store);

    insertNewItemService.execute(item);

    let nameItem = retrieveItemService.execute("name");

    expect(nameItem).toBe("John");

    jest.advanceTimersByTime(3100);

    nameItem = retrieveItemService.execute("name");

    expect(nameItem).toBeUndefined();
  });
});
