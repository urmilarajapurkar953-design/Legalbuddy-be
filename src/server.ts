import "dotenv/config";
import app from "./app";
import logger from "./common/logger";
import { createServer } from "http";
import "./queue/redis/connection";
import { setupLegalWorker } from "./queue/workers/legal.worker";

const PORT = process.env.PORT || 8080;

const httpServer = createServer(app);

setupLegalWorker();

httpServer.listen(PORT, () => {
  logger.info(`server running on port ${PORT}`);
});