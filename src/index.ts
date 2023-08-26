import app from "./app";
import { PORT } from "./utils/config";

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
// eslint-disable-next-line @typescript-eslint/no-explicit-any
