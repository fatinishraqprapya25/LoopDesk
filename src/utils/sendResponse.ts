import { Response } from 'express';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

export const sendResponse = <T>(
    res: Response,
    statusCode: number,
    msgObj: { message: string; data?: T }
): void => {
    const { message, data } = msgObj;
    const responsePayload: ApiResponse<T> = {
        success: statusCode >= 200 && statusCode < 300,
        message: message,
        data: data,
    };

    res.status(statusCode).json(responsePayload);
};