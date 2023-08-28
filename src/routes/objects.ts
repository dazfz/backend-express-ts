import { Router, RequestHandler } from "express";
import Object from "../models/object";
import User from "../models/user";
import { Types } from "mongoose";

const router = Router();

router.get("/", (async (_req, res) => {
  const objects = await Object.find({}).populate("user", {
    username: 1,
  });
  res.json(objects);
}) as RequestHandler);

router.post("/", (async (req, res) => {
  const { name } = req.body as {
    name: string;
  };

  if (!req.token) return res.status(401).json({ error: "token missing" });
  if (!name) return res.status(400).json({ error: "Name is required." });
  if (!req.user) return res.status(401).json({ error: "not logged in" });

  // Get the user from the database
  const user = await User.findOne({ _id: req.user });
  if (!user) return res.status(401).json({ error: "user doesn't exist" });

  const object = new Object({
    name: name,
    user: user.id as string,
  });

  const savedObject = await object.save();
  user.objects = user.objects.concat(savedObject._id as Types.ObjectId);
  await user.save();

  return res.status(201).json(savedObject);
}) as RequestHandler);

router.get("/:id", (async (req, res) => {
  const object = await Object.findById(req.params.id);
  if (object) {
    res.json(object);
  } else {
    res.status(404).end();
  }
}) as RequestHandler);

router.delete("/:id", (async (req, res) => {
  // Create "new" user to access properties
  const user = new User(req.user);

  const objectToDelete = await Object.findById(req.params.id);

  if (!req.token) {
    return res.status(401).json({ error: "token missing" });
  }

  if (user && objectToDelete && user.id !== objectToDelete.user.toString()) {
    return res
      .status(403)
      .json({ error: "only the creator can delete this object" });
  }

  await Object.findByIdAndRemove(req.params.id);
  return res.status(204).end();
}) as RequestHandler);

export default router;
