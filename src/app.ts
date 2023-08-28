import { MONGODB_URI } from "./utils/config";
import express from "express";
import "express-async-errors";
import cors from "cors";
import objectRouter from "./routes/objects";
import usersRouter from "./routes/users";
import loginRouter from "./routes/login";
import testingRouter from "./routes/testing";
import * as mw from "./utils/middleware";
import mongoose from "mongoose";

const app = express();

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}

mongoose.set("strictQuery", false);

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error: Error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use(cors<express.Request>());
app.use(express.json());
app.use(mw.morganMiddleware);
app.use(mw.tokenExtractor);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use("/api/objects", mw.userExtractor, objectRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(mw.unknownEndpoint);
app.use(mw.errorHandler);

export default app;
