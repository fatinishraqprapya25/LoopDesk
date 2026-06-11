import { Server } from 'http';
import prisma from '../config/prisma.js';

export const gracefulShutdown = (server: Server): void => {
    const shutdown = async (signal: string): Promise<void> => {
        console.log(`Received ${signal}. Shutting down gracefully...`);

        server.close(async () => {
            console.log('HTTP server closed.');
            await prisma.$disconnect();
            console.log('Prisma disconnected. Database connection pool closed.');
            process.exit(0);
        });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
};