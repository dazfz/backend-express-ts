import express, { Request } from "express";
import cors from "cors";
import objectRouter from "./routes/objects";
import { morganMiddleware } from "./utils/middleware";

const app = express();

app.use(cors<Request>());
app.use(express.json());
app.use(morganMiddleware);

app.use("/api/objects", objectRouter);

export default app;
