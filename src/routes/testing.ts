import { Router, RequestHandler } from "express";
import Object from "../models/object";
import User from "../models/user";

const router = Router();

router.post("/reset", (async (_req, res) => {
  await Object.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
}) as RequestHandler);

export default router;
