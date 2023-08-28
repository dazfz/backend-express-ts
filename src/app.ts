import express, { Request } from "express";
import cors from "cors";
import objectRouter from "./routes/objects";
import { morganMiddleware, unknownEndpoint } from "./utils/middleware";

const app = express();

app.use(cors<Request>());
app.use(express.json());
app.use(morganMiddleware);

app.use("/api/objects", objectRouter);

app.use(unknownEndpoint);

export default app;
