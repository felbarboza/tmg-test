import { Router } from "express";
import { TtlStoreController } from "../controllers/TtlStoreController";

const ttlStoreRouter = Router();
const ttlStoreController = new TtlStoreController();

ttlStoreRouter.post("/", (req, res) => {
  return ttlStoreController.insertItem(req, res);
});

ttlStoreRouter.get("/:key", (req, res) => {
  return ttlStoreController.retrieveItem(req, res);
});

ttlStoreRouter.delete("/:key", (req, res) => {
  return ttlStoreController.deleteItem(req, res);
});

export default ttlStoreRouter;
