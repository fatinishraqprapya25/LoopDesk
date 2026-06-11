import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', async (req: Request, res: Response): Promise<void> => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({
            status: 'UP',
            message: 'Server and database are healthy',
            timestamp: new Date()
        });
    } catch (error: any) {
        res.status(500).json({
            status: 'DOWN',
            message: 'Database connection failed',
            error: error.message
        });
    }
});

app.use((req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
        success: false,
        message: `API route not found: ${req.originalUrl}`
    });
});

app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

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