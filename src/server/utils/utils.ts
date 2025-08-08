import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const defaultErrorResponse = (
  res: Response, error: Error,
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
): Response => {
  return res.status(statusCode).json({
    errors: { default: error.message },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const devLog = (message?: any, ...optionalParams: any[]) => {
  const env = process.env.NODE_ENV;
  if (env == null) return;

  const shouldLog = ['dev', 'develop', 'development'].includes(env);
  if (!shouldLog) return;

  console.log(message, optionalParams);
};
