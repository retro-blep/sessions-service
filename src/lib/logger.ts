import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
});

// type LogLevel = "debug" | "info" | "warn" | "error";

// export class Logger {
//   constructor(private context: string) {}

//   private format(level: LogLevel, message: string, meta?: unknown) {
//     const timestamp = new Date().toISOString();
//     const base = `[${timestamp}] [${level.toUpperCase()}] [${this.context}]`;
//     if (meta) {
//       return `${base} ${message} ${JSON.stringify(meta)}`;
//     }
//     return `${base} ${message}`;
//   }

//   debug(message: string, meta?: unknown) {
//     // eslint-disable-next-line no-console
//     console.debug(this.format("debug", message, meta));
//   }

//   info(message: string, meta?: unknown) {
//     // eslint-disable-next-line no-console
//     console.info(this.format("info", message, meta));
//   }

//   warn(message: string, meta?: unknown) {
//     // eslint-disable-next-line no-console
//     console.warn(this.format("warn", message, meta));
//   }

//   error(message: string, meta?: unknown) {
//     // eslint-disable-next-line no-console
//     console.error(this.format("error", message, meta));
//   }
// }

// export const createLogger = (context: string) => new Logger(context);
