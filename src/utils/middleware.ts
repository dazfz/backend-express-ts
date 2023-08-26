import morgan from "morgan";
import { Request, Response } from "express";

morgan.token("json-body", (req: Request, _res: Response) => {
  return JSON.stringify(req.body);
});

const jsonFormat =
  ":method :url :status :response-time ms - :json-body";

const morganMiddleware = morgan(jsonFormat);

export { morganMiddleware };
