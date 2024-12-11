/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse, TErrorSources } from '../../types/error';

export const handleDuplicateError = (err: any): TErrorResponse => {
  const duplicateField = Object.keys(err.keyValue)[0];
  const duplicateValue = err.keyValue[duplicateField];
  const message = `${duplicateField} value '${duplicateValue}' is already in use.`;

  const errorSources: TErrorSources = [
    {
      path: duplicateField,
      message,
    },
  ];

  return {
    statusCode: 409,
    message,
    errorSources,
  };
};
