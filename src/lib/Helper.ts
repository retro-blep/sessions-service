import { randomBytes, scrypt as _scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);
const KEY_LEN = 64; // bytes

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, Buffer.from(salt, "hex"), KEY_LEN)) as Buffer;
  return `${salt}:${derived.toString("hex")}`; // store as salt:derivedHex
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split(":");
  if (parts.length !== 2) return false;
  const [salt, keyHex] = parts as [string, string];
  const derived = (await scrypt(password, Buffer.from(salt, "hex"), KEY_LEN)) as Buffer;
  const key = Buffer.from(keyHex, "hex");
  if (derived.length !== key.length) return false;
  return timingSafeEqual(derived, key);
}

export function prefixedLogger(baseLogger: any, prefix: string) {
  if (typeof baseLogger?.child === "function") {
    return baseLogger.child({ prefix });
  }

  const methods = ["info", "error", "warn", "debug", "trace", "fatal"];
  const wrapped: Record<string, any> = {};
  for (const m of methods) {
    if (typeof baseLogger[m] === "function") {
      wrapped[m] = (...args: any[]) => {
        if (typeof args[0] === "string") {
          return baseLogger[m](`${prefix} | ${args[0]}`, ...args.slice(1));
        }
        if (typeof args[1] === "string") {
          return baseLogger[m](args[0], `${prefix} | ${args[1]}`, ...args.slice(2));
        }
        return baseLogger[m](...args);
      };
    }
  }
  for (const k of Object.keys(baseLogger)) {
    if (!(k in wrapped)) (wrapped as any)[k] = (baseLogger as any)[k];
  }
  return wrapped;
}
