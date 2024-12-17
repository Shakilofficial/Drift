import mongoose from 'mongoose';
import { TErrorResponse, TErrorSources } from '../../types/error';

const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error 🔄',
    errorSources,
  };
};

export default handleCastError;
