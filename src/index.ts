import "reflect-metadata";
import http from "http";
import { Container } from "typedi";
import { useContainer } from "routing-controllers";
import { DataSource } from "typeorm";

import { createApp } from "./app";
import { env } from "./env";
import { logger } from "./lib/logger";
import { initializeDatabase } from "./loaders/dbLoader";
import { DatabaseManager } from "./loaders/DatabaseManager";
import { RealtimeHub } from "./lib/RealTimeHub";
import { CardService } from "./services/CardService";

process.on("unhandledRejection", (reason: any, promise) => {
  logger.error(
    { reason, promise },
    "Unhandled Rejection at Promise"
  );
});

process.on("uncaughtException", (error: Error) => {
  logger.error({ error }, "Uncaught Exception thrown");
  process.exit(1);
});

async function bootstrap() {
  const log = logger.child({ module: "src/index" });
  log.info("Initializing application");

  // routing-controllers/typedi mek shake hands, work together, comrades.
  useContainer(Container);

  await initializeDatabase();

  try {
    const ds: DataSource = DatabaseManager.getConnection(); // default name
    Container.set(DataSource, ds);
    logger.info("📚 Container registration worked! 📚 Connected to MongoDB - yippeeee 📚");
  } catch (err) {
    logger.error({ err }, "❌ Failed to register DataSource in Container ❌");
    throw err;
  }

  const app = createApp();
  const server = http.createServer(app);
  const cardService = Container.get(CardService);

  // realtime stuff ! o: 
  const hub = new RealtimeHub(server, cardService);
  // For when i use hub later
  // Container.set(RealtimeHub, hub);

  
  const port = env.port;
  server.listen(port, () => {
    logger.info(`Sessions service listening on port ${port}`);
    console.log(`Sessions service listening on port ${port}`);
    console.log(`WebSocket endpoint available at ws://localhost:${port}/ws`);
  });
}

// Kick everything off
bootstrap().catch((err) => {
  logger.error({ err }, "Failed to initialize/start application");
  process.exit(1);
});
