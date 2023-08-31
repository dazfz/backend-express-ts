import { Router, RequestHandler } from "express";
import { MyObject, User } from "../models/index";
const router = Router();

router.get("/", (async (_req, res) => {
  const users = await User.findAll({
    include: {
      model: MyObject,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
}) as RequestHandler);

router.post("/", (async (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const user = await User.create(req.body);
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
}) as RequestHandler);

router.get("/:id", (async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
}) as RequestHandler);

export default router;
