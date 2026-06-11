import { NextFunction, Request, Response } from "express";

const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
        success: false,
        message: `API route not found: ${req.originalUrl}`
    });
}

export default notFoundHandler;