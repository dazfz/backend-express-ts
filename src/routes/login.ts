import { Router, RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { SECRET } from "../utils/config";
import { User } from "../models/index";

const router = Router();

router.post("/", (async (request, response) => {
  const { username, password } = request.body as {
    username: string;
    password: string;
  };

  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    // temp
    const passwordCorrect = password === password;

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET);

    return response.status(200).send({ token, username: user.username });
  } catch (error) {
    return response.status(500).json({ error: "An error occurred" });
  }
}) as RequestHandler);

export default router;
