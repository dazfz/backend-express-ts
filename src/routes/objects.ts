/* eslint-disable @typescript-eslint/no-misused-promises */
// Temp
import {
  Router,
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import { MyObject, User } from "../models/index";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/config";

declare module "express-serve-static-core" {
  interface Request {
    decodedToken: { id: number };
    object?: MyObject;
  }
}

const router = Router();

router.get("/", (async (_req, res) => {
  const objects = await MyObject.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["username"],
    },
  });
  console.log(JSON.stringify(objects));
  res.json(objects);
}) as RequestHandler);

const tokenExtractor = (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const decodedToken = jwt.verify(authorization.substring(7), SECRET) as {
      id: number;
    };
    req.decodedToken = decodedToken;
  }
  next();
};

router.post("/", tokenExtractor, (async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    // const object = MyObject.build(req.body);
    // await object.save();
    if (!user) return res.status(400).json({ Error });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const object = await MyObject.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    return res.json(object);
  } catch (error) {
    return res.status(400).json({ error });
  }
}) as RequestHandler);

const objectFinder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const object = await MyObject.findByPk(req.params.id);
    if (object !== null) {
      req.object = object;
      next();
    } else {
      res.status(404).json({ error: "object not found" });
    }
  } catch (error) {
    res.status(500).json({ Error });
  }
};

router.get("/:id", objectFinder, (req, res) => {
  if (req.object) {
    res.json(req.object);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", objectFinder, (async (req, res) => {
  if (req.object) {
    await req.object.destroy();
  }
  res.status(204).end();
}) as RequestHandler);

router.put("/:id", objectFinder, (async (req, res) => {
  if (req.object) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    req.object.name = req.body.name;
    await req.object.save();
    res.json(req.object);
  } else {
    res.status(404).end();
  }
}) as RequestHandler);

export default router;
