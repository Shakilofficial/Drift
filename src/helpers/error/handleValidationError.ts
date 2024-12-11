import mongoose from 'mongoose';
import { TErrorResponse } from '../../types/error';

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errors: string[] = Object.values(err.errors).map((el) => el.message);
  return {
    statusCode: 422,
    message: `Validation failed: ${errors.join(', ')}`,
    errorSources: errors.map((message) => ({ path: '', message })),
  };
};
