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
