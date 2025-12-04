import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 4001,
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/retro_sessions",
  nodeEnv: process.env.NODE_ENV || "development",
  db: {
    url: process.env.DB_URL || "mongodb://localhost:27017/retro_sessions",
    type: process.env.DB_TYPE || "mongodb",
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "retro_sessions",
    replicaset: process.env.DB_REPLICASET || undefined,
    sslValidation: process.env.DB_SSL_VALIDATE === 'true',
    logging: process.env.DB_LOGGING === 'true',
    runMigrations: process.env.DB_RUN_MIGRATIONS === 'true',
    dropSchema: process.env.DB_DROP_SCHEMA === 'true',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 27017,
  },
  dirs: {
    entities: [__dirname + "/models/*.{ts,js}"],
  },
};
