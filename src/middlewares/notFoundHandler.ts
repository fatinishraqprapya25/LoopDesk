import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/sendResponse.js';

export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    sendResponse(res, 404, {
        message: `API route not found: ${req.originalUrl}`,
    });
};