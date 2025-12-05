import express, { Application } from "express";
import { useExpressServer } from "routing-controllers";
import { HealthController } from "./controllers/HealthController";
import { SessionController } from "./controllers/SessionController";

export function createApp(): Application {
  const app = express();

  app.use(express());

  useExpressServer(app, {
    controllers: [HealthController, SessionController],
    cors: true,
    // classTransformer: true // for later stuff 
  });

  return app;
}
