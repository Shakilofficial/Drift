import { ZodError } from 'zod';
import { TErrorResponse } from '../../types/error';

export const handleZodError = (err: ZodError): TErrorResponse => {
  const errors = err.errors.map((e) => ({
    path: e.path.join('.'),
    message: e.message,
  }));
  return {
    statusCode: 400,
    message: 'Zod validation failed',
    errorSources: errors,
  };
};
