import { Router } from "express";
import { StackController } from "../controllers/StackController";

const stackRouter = Router();
const stackController = new StackController();

stackRouter.get("/", (req, res) => {
  return stackController.retrieveItem(req, res);
});

stackRouter.post("/", (req, res) => {
  return stackController.insertItem(req, res);
});

export default stackRouter;
