import { Item } from "@modules/ttl-store/dtos/Item";
import { DeleteItemOnStoreService } from "@modules/ttl-store/services/DeleteItemOnStore.service";
import { InsertNewItemOnStoreService } from "@modules/ttl-store/services/InsertNewItemOnStore.service";
import { RetrieveItemFromStoreService } from "@modules/ttl-store/services/RetrieveItemFromStore.service";
import { JoiValidationError } from "@shared/errors/JoiItemValidationError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import insertItemSchema from "../validators/insertItem.validator";
import paramKeySchema from "../validators/paramKey.validator";

export class TtlStoreController {
  private store: { [key: string]: any } = {};

  constructor() {
    this.store = {};
  }

  public insertItem(req: Request, res: Response): Response {
    const { error } = insertItemSchema.validate(req.body);

    if (error) {
      throw new JoiValidationError(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
    }

    const { key, value, ttl } = req.body;
    const item: Item = {
      key,
      value,
      ttl,
    };

    const insertNewItemService = container.resolve(InsertNewItemOnStoreService);

    insertNewItemService.execute(item);

    return res.status(201).json();
  }

  public retrieveItem(req: Request, res: Response): Response {
    const { error } = paramKeySchema.validate(req.params);

    if (error) {
      throw new JoiValidationError(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
    }

    const key = req.params.key;

    const retrieveItemService = container.resolve(RetrieveItemFromStoreService);

    const item = retrieveItemService.execute(key);

    return res.status(200).json({
      value: item,
    });
  }

  public deleteItem(req: Request, res: Response): Response {
    const { error } = paramKeySchema.validate(req.params);

    if (error) {
      throw new JoiValidationError(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
    }

    const key = req.params.key;

    const deleteItemOnStore = container.resolve(DeleteItemOnStoreService);

    deleteItemOnStore.execute(key);

    return res.status(200).json();
  }
}
