import { Request, Response } from "express";
import { container } from "tsyringe";
import { RetrieveItemFromStackService } from "@modules/stack/services/RetrieveItemFromStack.service";
import { InsertItemOnStackService } from "@modules/stack/services/InsertItemOnStack.service";
import { JoiValidationError } from "@shared/errors/JoiItemValidationError";
import insertItemSchema from "../validators/insertItem.validator";

export class StackController {
  public insertItem(req: Request, res: Response): Response {
    const { error } = insertItemSchema.validate(req.body);

    if (error) {
      throw new JoiValidationError(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
    }

    const { value } = req.body;

    const insertItemService = container.resolve(InsertItemOnStackService);

    insertItemService.execute(value);

    return res.status(201).json();
  }

  public retrieveItem(req: Request, res: Response): Response {
    const retrieveItemService = container.resolve(RetrieveItemFromStackService);

    const item = retrieveItemService.execute();

    return res.status(200).json({
      value: item,
    });
  }
}
