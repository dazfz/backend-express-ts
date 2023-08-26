import morgan from "morgan";
import { Request, Response ,NextFunction} from "express";

morgan.token("json-body", (req: Request, _res: Response) => {
  return JSON.stringify(req.body);
});

const jsonFormat = ":method :url :status :response-time ms - :json-body";

const morganMiddleware = morgan(jsonFormat);

const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

const unknownEndpoint = (_req: Request, res: Response): void => {
  res.status(404).send({ error: "unknown endpoint" });
};
export { morganMiddleware, requestLogger, unknownEndpoint };
