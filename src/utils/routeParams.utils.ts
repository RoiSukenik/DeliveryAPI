import { HTTP_CODE } from '../constants';
import { Request, NextFunction, Response } from 'express';

export async function CheckRequestParams(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
        res.status(HTTP_CODE.INTERNAL_ERROR).send('Missing Body in Request');
    }
    next();
}
