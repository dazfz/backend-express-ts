import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Router, RequestHandler } from "express";
import { Types } from "mongoose";
import User from "../models/user";
import { SECRET } from "../utils/config";

const router = Router();

router.post("/", (async (req, res) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id as Types.ObjectId,
  };

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(userForToken, SECRET, {
    expiresIn: 60 * 60,
  });

  return res.status(200).send({ token, username: user.username });
}) as RequestHandler);

export default router;
