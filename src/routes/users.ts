import { Router, RequestHandler } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

const router = Router();

router.post("/", (async (req, res) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Both username and password are required." });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  return res.status(201).json(savedUser);
}) as RequestHandler);

router.get("/", (async (_req, res) => {
  const users = await User.find({}).populate("objects", { name: 1 });
  res.json(users);
}) as RequestHandler);

export default router;
