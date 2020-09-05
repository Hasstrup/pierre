import express, { Handler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { bundleMiddlewares } from '@/shared/wrappers';
import createLogger from '@/shared/logger';
import { Application } from '@/application';
import * as routers from '@/api/routers'

// TODO{H.Ezekiel} - there's a better way to do this - peek docs
dotenv.config();

const config = {
  ...process.env
}

const logger = createLogger(config)

const handlers: Handler[] = [
  express.urlencoded({ extended: true }),
  express.json(),
  cors(),
]

const app = new Application({
  app: express(),
  config,
  logger,
  middlewares: bundleMiddlewares(handlers),
  routers: Object.values(routers)
})

app.SetUp().Serve()
