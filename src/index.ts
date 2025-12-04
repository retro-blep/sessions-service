import "reflect-metadata";
import express from "express";
import { Container } from "typedi";
import { useContainer, useExpressServer } from "routing-controllers";
import { DataSource } from "typeorm";
import { SessionController } from "./controllers/SessionController";
import { HealthController } from "./controllers/HealthController";
import { env } from "./env";
import { logger } from "./lib/logger";
import { initializeDatabase } from "./loaders/dbLoader";
import { DatabaseManager } from "./loaders/DatabaseManager";

const init = async () => {
  const log = logger.child({ module: "src/index" });
  log.info("Initializing application");



useContainer(Container);

await initializeDatabase();

  // register the initialized DataSource instance in typedi so controllers receive it
  try {
    const ds: DataSource = DatabaseManager.getConnection(); // default name
    Container.set(DataSource, ds);
    logger.info('📚 Container registration worked! 📚 Connected to MongoDB - yippeeee 📚')
  } catch (err) {
    logger.error({ err }, " ❌ Failed to register DataSource in Container ❌ ");
    throw err;
  }

const app = express();
useExpressServer(app, {
  controllers: [HealthController, SessionController], // explicitly register controllers
  cors: true,
  // classTransformer: true, // optional
});
const port = process.env.PORT ?? 3000;



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

// app.use("/sessions", sessionRoutes);

const start = async () => {

  app.listen(env.port, () => {
    logger.info(`Sessions service listening on port ${env.port}`);
    console.log(`Sessions service listening on port ${env.port}`);
  });
};

start().catch((err) => {
  logger.error({ err }, "Failed to start service");
  process.exit(1);
});
};

init().catch((err) => {
  logger.error({ err }, "Failed to initialize application");
  process.exit(1);
});
