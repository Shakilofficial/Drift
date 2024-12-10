import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './routes';
import sendResponse from './utils/sendResponse';
import notFound from './middlewares/notFound';

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

//Not Found Route
app.use(notFound);

export default app;
