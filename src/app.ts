import express, { Request } from "express";
import cors from "cors";
import objectRouter from "./routes/objects";
import {
  morganMiddleware,
  requestLogger,
  unknownEndpoint,
} from "./utils/middleware";

const app = express();

app.use(cors<Request>());
app.use(express.json());
app.use(morganMiddleware);
app.use(requestLogger);

app.use("/api/objects", objectRouter);

app.use(unknownEndpoint);

export default app;
