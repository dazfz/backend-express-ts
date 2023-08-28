import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { SECRET } from "./config";

declare module "express-serve-static-core" {
  interface Request {
    token: string | null;
    user: typeof User | null;
  }
}

morgan.token("json-body", (req: Request, _res: Response) => {
  return JSON.stringify(req.body);
});

const jsonFormat = ":method :url :status :response-time ms - :json-body";

const morganMiddleware = morgan(jsonFormat);

const unknownEndpoint = (_req: Request, res: Response): void => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  return next(error);
};

const tokenExtractor = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.replace("bearer ", "");
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  if (!request.token) {
    request.user = null;
    return next();
  }

  const decodedToken = jwt.verify(request.token, SECRET) as jwt.JwtPayload;
  if (!decodedToken.id) {
    request.user = null;
    return next();
  }

  request.user = await User.findById(decodedToken.id);
  return next();
};

export {
  morganMiddleware,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
