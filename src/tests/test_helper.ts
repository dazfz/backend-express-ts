import Object from "../models/object";
import User from "../models/user";
import { Types } from "mongoose";
const initialObjects = [
  {
    name: "test1",
  },
  {
    name: "test2",
  },
];

const nonExistingId = async (): Promise<string> => {
  const object = new Object({ name: "willremovethissoon" });
  await object.save();
  await object.deleteOne();

  return (object._id as Types.ObjectId).toString();
};

const objectsInDb = async () => {
  const objects = await Object.find({});
  return objects.map((object) => object.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

export { initialObjects, nonExistingId, objectsInDb, usersInDb };
