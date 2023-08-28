import { Schema, Document, Types, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IUser extends Document {
  username: string;
  passwordHash: string;
  objects: Types.ObjectId[];
}

export interface IUserModel extends IUser, Document {}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: String,
  objects: [
    {
      type: Types.ObjectId,
      ref: "Object",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    if (returnedObject._id instanceof Types.ObjectId) {
      returnedObject.id = returnedObject._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

export default model<IUser>("User", userSchema);
