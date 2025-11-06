import app from "./app";
import { config } from "./config";

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`[Server]: App similars listening on http://localhost:${PORT}`);
  console.log(`[Server]: Connecting to mocks on ${config.mockApiUrl}`);
});
