import mongoose from 'mongoose';
import { TErrorResponse } from '../../types/error';

export const handleCastError = (
  err: mongoose.Error.CastError,
): TErrorResponse => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return {
    statusCode: 400,
    message,
    errorSources: [{ path: err.path, message: message }],
  };
};
