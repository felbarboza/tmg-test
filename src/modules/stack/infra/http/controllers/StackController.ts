import { Request, Response } from "express";
import { container } from "tsyringe";
import { RetrieveItemFromStackService } from "@modules/stack/services/RetrieveItemFromStack.service";
import { InsertItemOnStackService } from "@modules/stack/services/InsertItemOnStack.service";

export class StackController {
  public async insertItem(req: Request, res: Response): Promise<Response> {
    const { value } = req.body;

    const insertItemService = container.resolve(InsertItemOnStackService);

    insertItemService.execute(value);

    return res.status(201).json();
  }

  public async retrieveItem(req: Request, res: Response): Promise<Response> {
    const retrieveItemService = container.resolve(RetrieveItemFromStackService);

    const item = retrieveItemService.execute();

    return res.status(200).json({
      value: item,
    });
  }
}
