import { Express } from "express";

export interface AppOptions {
  app: Express;
  config: Config;
  logger: Logger;
  middlewares?: Middleware[];
  routers: Router[];
}

export interface Config {
  HOSTNAME?: string;
  PORT?: number;
  LOG_NAME?: string;
  LOG_LEVEL?: string;
  NODE_ENV?: string;
  API_PREFIX?: string;
}

export interface LogFn {
  (msg: string, ...args: any[]): void;
  (obj: object, msg?: string, ...args: any[]): void;
}

export interface Logger {
  debug: LogFn;
  error: LogFn;
  info: LogFn;
  warn: LogFn;
}

// TODO{H.Ezekiel} - move this to more local scope
export interface Middleware {
  Perform: (app: Express) => Express;
}

export interface Router {
  Register: (app: Express) => Express;
}
