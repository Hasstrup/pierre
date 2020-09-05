import { BaseRouter } from '@/api/routers/base';
import { RouterMapping } from '@/api/routers/shared/types';
import { API_NAMESPACE } from '@/api/routers/shared/constants';

class HealthRouter extends BaseRouter {
    get registry(): RouterMapping[] {
      return [{
          method: "get",
          path: "health"
      }]
    }
}

export const healthRouter = new HealthRouter(API_NAMESPACE)