import express, { Application } from "express";
import { useExpressServer } from "routing-controllers";
import { HealthController } from "./controllers/HealthController";
import { SessionController } from "./controllers/SessionController";

export function createApp(): Application {
  const app = express();

  app.use(express());
  app.use(express.urlencoded({ extended: true }));

  useExpressServer(app, {
    controllers: [HealthController, SessionController],
    // later: prepare an allowlist/whitelist for cors
    cors: { origin: [/^https?:\/\/localhost:\d+$/] }, // regex and i have a complicated relationship..
    validation: { whitelist: true, forbidNonWhitelisted: true },
    classTransformer: true,
  });

  return app;
}
