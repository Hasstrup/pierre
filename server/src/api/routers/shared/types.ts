import { Response, Request } from 'express';

export interface RouterMapping {
    path: string;
    method: string;
    handle?: (req: Request, res: Response) => void;
}