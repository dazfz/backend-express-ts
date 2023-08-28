import morgan from "morgan";
import { Request, Response } from "express";

morgan.token("json-body", (req: Request, _res: Response) => {
  return JSON.stringify(req.body);
});

const jsonFormat = ":method :url :status :response-time ms - :json-body";

const morganMiddleware = morgan(jsonFormat);

const unknownEndpoint = (_req: Request, res: Response): void => {
  res.status(404).send({ error: "unknown endpoint" });
};

export { morganMiddleware, unknownEndpoint };
