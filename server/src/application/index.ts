import os from "os";
import { Express } from "express";
import { DEFAULT_HOST_NAME, DEFAULT_PORT } from "./constants";
import { AppOptions, Config, Logger, Middleware, Router } from "@/shared/types";

export class Application {
  private app: Express;
  private config: Config;
  private hostname: string;
  private logger: Logger;
  private middlewares: Middleware[];
  private port: number | string;
  private routers: Router[];

  constructor(options: AppOptions) {
    this.app = options.app;
    this.config = options.config;
    this.hostname = this.config.HOSTNAME || os.hostname() || DEFAULT_HOST_NAME;
    this.logger = options.logger;
    this.middlewares = options.middlewares;
    this.port = this.config.PORT || DEFAULT_PORT;
    this.routers = options.routers;
  }

  private setUpMiddlewares = () => {
    this.middlewares?.forEach((middleware) => {
      this.app = middleware.Perform(this.app);
    });
  };

  private registerRouters = () => {
    this.routers.forEach((router) => {
      router.Register(this.app);
    });
  };

  public SetUp = (): Application => {
     this.setUpMiddlewares()
     this.registerRouters()

     return this;
  }

  public Serve = () => {
    console.log(this.app.routes)
    this.app.listen(this.port, () => {
      this.logger.info(
        `The API is now listening on ${this.hostname}:${this.port}`
      );
    });
  };
}
