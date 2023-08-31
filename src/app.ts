import express, { Request } from "express";
import cors from "cors";
import objectRouter from "./routes/objects";
import usersRouter from "./routes/users";
import loginRouter from "./routes/login";
import { morganMiddleware, unknownEndpoint } from "./utils/middleware";

const app = express();

app.use(cors<Request>());
app.use(express.json());
app.use(morganMiddleware);

app.use("/api/objects", objectRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(unknownEndpoint);

export default app;
