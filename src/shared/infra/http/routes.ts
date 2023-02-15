import { Router } from "express";
import stackRouter from "@modules/stack/infra/http/routes/stack.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json";
import ttlStoreRouter from "@modules/ttl-store/infra/http/routes/ttl-store.routes";

const routes = Router();

routes.use("/api-docs", swaggerUi.serve);
routes.get("/api-docs", swaggerUi.setup(swaggerDocument));

routes.use("/stack", stackRouter);
routes.use("/ttl-store", ttlStoreRouter);

export default routes;
