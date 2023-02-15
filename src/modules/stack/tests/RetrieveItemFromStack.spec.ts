import "reflect-metadata";
import { RetrieveItemFromStackService } from "../services/RetrieveItemFromStack.service";

describe("RetrieveItemFromStack Service", () => {
  let stack: (number | string)[];
  let retrieveItemService: RetrieveItemFromStackService;

  beforeEach(() => {
    stack = [1, "test"];
    retrieveItemService = new RetrieveItemFromStackService(stack);
  });

  it("should retrieve an item from the stack", () => {
    const item = retrieveItemService.execute();
    expect(item).toBeDefined();
    expect(stack).toEqual([1]);
  });

  it("should retrieve multiple items from the stack", () => {
    const item1 = retrieveItemService.execute();
    const item2 = retrieveItemService.execute();
    expect(item1).toBeDefined();
    expect(item2).toBeDefined();
    expect(stack).toEqual([]);
  });

  it("should return undefined when retrieving from an empty stack", () => {
    stack = [];
    retrieveItemService = new RetrieveItemFromStackService(stack);
    const item = retrieveItemService.execute();
    expect(item).toBeUndefined();
  });
});
