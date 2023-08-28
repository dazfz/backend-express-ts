import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || "3000";

const MONGODB_URI: string =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI || "mongodb://localhost/testdb"
    : process.env.MONGODB_URI || "mongodb://localhost/mydb";

const SECRET = process.env.SECRET || "SECRET";

export { PORT, MONGODB_URI, SECRET };
