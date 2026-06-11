import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/sendResponse.js';

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    const dataPayload: any = {
        errorSources: err.errors || [],
    };

    if (process.env.NODE_ENV === 'development') {
        dataPayload.stack = err.stack;
    }

    sendResponse(res, statusCode, {
        message,
        data: dataPayload,
    });
};