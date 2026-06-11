import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { gracefulShutdown } from './utils/gracefulShutdown.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(notFoundHandler);
app.use(globalErrorHandler);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

gracefulShutdown(server);