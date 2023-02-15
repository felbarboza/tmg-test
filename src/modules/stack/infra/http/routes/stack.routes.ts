import { Router } from "express";
import { StackController } from "../controllers/StackController";
import insertItemSchema from "../validators/insertItem.validator";

const stackRouter = Router();
const stackController = new StackController();

stackRouter.get("/", (req, res) => {
  return stackController.retrieveItem(req, res);
});

stackRouter.post("/", async (req, res) => {
  const { error, value } = insertItemSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  return stackController.insertItem(req, res);
});

export default stackRouter;
