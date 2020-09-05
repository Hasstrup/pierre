import { Express, Handler } from 'express';
import { Middleware } from '@/shared/types';

const createMiddleWare = (handler: Handler): Middleware => {
    return {
      Perform: (app: Express) => app.use(handler) && app,
    };
  };
  
  export const bundleMiddlewares = (handlers: Handler[]): Middleware[] =>
    handlers.map((handler) => createMiddleWare(handler));