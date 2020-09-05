
import { Response, Express } from 'express';
import { RouterMapping } from '@/api/routers/shared/types';
import { Router } from '@/shared/types';

export class BaseRouter implements Router {
  constructor(public namespace: string) {}

  public Register = (app: Express):  Express => {
    const map = this.makeRouteMatcherMap(app);
    this.registry.forEach((mapping) => {
        map[mapping.method](mapping.path, mapping.handle);
      });
    return app;
  }

  makeRouteMatcherMap = (app: Express) => {
    return {
      get: (path?: string, handle?: any) => app.get(`${this.namespace}/${path}`, handle || this.call),
      post: (path?: string, handle?: any) => app.post(`${this.namespace}/${path}`, handle || this.call),
      put: (path?: string, handle?: any) => app.put(`${this.namespace}/${path}`, handle || this.call),
      patch: (path?: string, handle?: any) => app.patch(`${this.namespace}/${path}`, handle || this.call),
    };
  };

  get registry(): RouterMapping[] {
    return []
  }

  call = (_, res: Response) => {
    res.json({ alive: true });
  };
}
