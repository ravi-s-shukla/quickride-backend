import http from "http";
import app from "./app.js";
import { initSocket } from "./socket/index.js";
import { env } from "./config/env.js";

const server = http.createServer(app);

initSocket(server);

server.listen(env.PORT, () => {
  console.log(`🚀 Socket Gateway running on port ${env.PORT}`);
});
