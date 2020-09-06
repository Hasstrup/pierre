import { Response, Request } from 'express';

/**
 * @BaseController
 * do nothing for now but in the future abstract common patterns here {H.ezekiel}
 *
 */
export class BaseController {
  constructor(public req: Request, public resp: Response) {}
}
