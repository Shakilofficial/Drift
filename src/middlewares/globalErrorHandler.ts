/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import AppError from '../helpers/error/AppError';
import { handleCastError } from '../helpers/error/handleCastError';
import { handleDuplicateError } from '../helpers/error/handleDuplicateKeyError';
import { handleValidationError } from '../helpers/error/handleValidationError';
import { handleZodError } from '../helpers/error/handleZodError';
import { sendErrorResponse } from '../utils/sendErrorResponse';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources = [{ path: '', message: 'Something went wrong' }];

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = err.errorSources.map((source) => ({
      path: String(source.path),
      message: source.message,
    }));
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources.map((source) => ({
      path: String(source.path),
      message: source.message,
    }));
  } else if (err instanceof mongoose.Error.CastError) {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources.map((source) => ({
      path: String(source.path),
      message: source.message,
    }));
  } else if (err instanceof mongoose.Error.ValidationError) {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources.map((source) => ({
      path: String(source.path),
      message: source.message,
    }));
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources.map((source) => ({
      path: String(source.path),
      message: source.message,
    }));
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [{ path: '', message: err.message }];
  }

  return sendErrorResponse(res, statusCode, message, errorSources, err.stack);
};

export default globalErrorHandler;
