import mongoose from "mongoose";
import { env } from "../env";
import { logger } from "../lib/logger";

export const connectMongo = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUrl);
    logger.info({ mongoUrl: env.mongoUrl }, "📚 Connected to MongoDB - yippeeee 📚");
  } catch (err) {
    logger.error({ err }, "❌ Failed to connect to MongoDB - bah humbug ❌");
    // In a real service it's usually better to crash and let the orchestrator restart it
    process.exit(1);
  }
};
