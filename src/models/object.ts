import { Schema, Document, Types, model } from "mongoose";
interface IObject extends Document {
  name: string;
  user: Types.ObjectId;
}

export interface IObjectModel extends IObject, Document {}

const objectSchema = new Schema({
  name: String,
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
});

// Transform _id ObjectId to string id
objectSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    if (returnedObject._id instanceof Types.ObjectId) {
      returnedObject.id = returnedObject._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<IObject>("Object", objectSchema);
