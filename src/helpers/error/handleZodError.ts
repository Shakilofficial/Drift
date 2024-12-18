import { ZodError, ZodIssue } from 'zod';
import { TErrorResponse, TErrorSources } from '../../types/error';

const handleZodError = (err: ZodError): TErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    const path = issue.path[issue.path.length - 1]; // Get the last part of the path (e.g., "name" instead of "body.name")
    let message = issue.message;

    // Customize error messages for more specificity
    if (issue.code === 'too_small' && issue.type === 'string') {
      message = `${path} must have at least ${issue.minimum} characters.`;
    } else if (issue.code === 'custom') {
      message = `${path} must meet the custom validation rules.`;
    } else if (issue.code === 'invalid_type') {
      message = `${path} must be of type ${issue.expected}.`;
    }

    return {
      path,
      message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error ⚠️',
    errorSources,
  };
};

export default handleZodError;
