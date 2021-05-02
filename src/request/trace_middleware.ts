import { Request, Response } from 'express';

export function trace(req: Request, res: Response, next: any): void {
    const fullUrl = req.method + ' ' + req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);
    next();
}
