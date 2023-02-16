import "reflect-metadata";
import express from "express";
import routes from "./routes";
import cors from "cors";
import rateLimiter from "./middlewares/rateLimiter";
import "@shared/containers";
import { ApplicationError } from "@shared/errors/ApplicationError";

export const app = express();

app.use(cors());
app.use(rateLimiter);
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof ApplicationError) {
    return response.status(err.errCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export function startServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    const server = app.listen(3000, () => {
      console.log("Server started on port 3000");
      resolve();
    });
    server.on("error", (err) => {
      console.error("Error starting server:", err);
      reject(err);
    });
  });
}
