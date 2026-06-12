import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import prisma from "../../config/prisma.js";

const checkHealth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        sendResponse(res, 200, {
            message: 'Server and database connection are completely operational.',
        });
    } catch (error) {
        next(error);
    }
}

const adminContollers = {
    checkHealth
}

export default adminContollers;