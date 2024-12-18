/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse } from '../../types/error';

const handleDuplicateError = (err: any): TErrorResponse => {
  const field = Object.keys(err.keyValue || {})[0]; // Extract field from keyValue
  const value = err.keyValue ? err.keyValue[field] : 'Unknown value';

  return {
    statusCode: 400,
    message: 'Duplicate value detected 🚫',
    errorSources: [
      {
        path: field || 'unknown', // Use extracted field, fallback to 'unknown'
        message: `The value "${value}" for the field "${field}" already exists.`,
      },
    ],
  };
};

export default handleDuplicateError;
