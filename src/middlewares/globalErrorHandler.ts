/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../helpers/error/AppError';
import handleCastError from '../helpers/error/handleCastError';
import handleDuplicateError from '../helpers/error/handleDuplicateError';
import handleValidationError from '../helpers/error/handleValidationError';
import handleZodError from '../helpers/error/handleZodError';
import { TErrorSources } from '../types/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Oops! Something went wrong 💥';
  let errorSources: TErrorSources = [
    { path: '', message: 'Oops! Something went wrong' },
  ];

  if (err instanceof ZodError) {
    const simplifiedZodError = handleZodError(err);
    statusCode = simplifiedZodError?.statusCode;
    message = simplifiedZodError?.message;
    errorSources = simplifiedZodError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedValidationError = handleValidationError(err);
    statusCode = simplifiedValidationError?.statusCode;
    message = simplifiedValidationError?.message;
    errorSources = simplifiedValidationError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedCastError = handleCastError(err);
    statusCode = simplifiedCastError?.statusCode;
    message = simplifiedCastError?.message;
    errorSources = simplifiedCastError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedDuplicateError = handleDuplicateError(err);
    statusCode = simplifiedDuplicateError?.statusCode;
    message = simplifiedDuplicateError?.message;
    errorSources = simplifiedDuplicateError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default globalErrorHandler;
