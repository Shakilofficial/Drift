import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T | T[] | null;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  // Check if the data is null or an empty array and handle the "No Data Found" case
  if (
    data.data === null ||
    (Array.isArray(data.data) && data.data.length === 0)
  ) {
    return res.status(404).json({
      success: false,
      message: 'No Data Found',
      data: [],
    });
  }

  // Proceed with the default response when data is found
  return res.status(data.statusCode).json({
    success: data.success,
    message: data.message || '', // Default to an empty string if message is undefined
    data: data.data,
  });
};

export default sendResponse;
