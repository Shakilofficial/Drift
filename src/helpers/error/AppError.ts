import { TErrorSources } from '../../types/error';

class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public errorSources: TErrorSources;

  constructor(
    message: string,
    statusCode: number,
    errorSources: TErrorSources = [{ path: '', message: message }],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errorSources = errorSources;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
