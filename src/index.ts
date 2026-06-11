import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { sendResponse } from './utils/sendResponse.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        sendResponse(res, 200, {
            message: 'Server and database connection are completely operational.',
        });
    } catch (error) {
        next(error);
    }
});

app.use(notFoundHandler);

app.use(globalErrorHandler);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const gracefulShutdown = async (signal: string): Promise<void> => {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
        console.log('HTTP server closed.');
        await prisma.$disconnect();
        console.log('Prisma disconnected. Database connection pool closed.');
        process.exit(0);
    });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));