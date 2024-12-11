import { Response } from 'express';
import config from '../config';
import { TErrorResponse } from '../types/error';

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errorSources: TErrorResponse['errorSources'],
  stack?: string | null,
) => {
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? stack : undefined,
  });
};
