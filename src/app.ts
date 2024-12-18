import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import router from './routes';
import sendResponse from './utils/sendResponse';
import AppError from './helpers/error/AppError';
import { StatusCodes } from 'http-status-codes';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

//Application Routes
app.use('/api/v1', router);

// Health Check Route
app.get('/', (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: '🌐 Drift server is live 🚀',
    data: null,
  });
});

// Test Route
app.get('/test', (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Test route is working 🚀 ',
    data: null,
  });
});



//global error handler
app.use(globalErrorHandler);
//Not Found Route
app.use(notFound);

export default app;
