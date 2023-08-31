import app from "./app";
import { PORT } from "./utils/config";
import { connectToDatabase } from "./utils/db";

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start().catch((error) => {
  console.error("Error starting the server:", error);
});
