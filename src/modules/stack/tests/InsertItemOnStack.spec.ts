import "reflect-metadata";
import { InsertItemOnStackService } from "../services/InsertItemOnStack.service";

describe("InsertItemOnStack Service", () => {
  let stack: (number | string)[];
  let insertItemService: InsertItemOnStackService;

  beforeEach(() => {
    stack = [];
    insertItemService = new InsertItemOnStackService(stack);
  });

  it("should insert a number onto the stack", () => {
    insertItemService.execute(1);
    expect(stack).toEqual([1]);
  });

  it("should insert a string onto the stack", () => {
    insertItemService.execute("test");
    expect(stack).toEqual(["test"]);
  });

  it("should insert multiple items onto the stack", () => {
    insertItemService.execute(1);
    insertItemService.execute("test");
    expect(stack).toEqual([1, "test"]);
  });
});
