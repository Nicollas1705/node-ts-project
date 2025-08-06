import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const defaultErrorResponse = (res: Response, error: Error): Response => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: { default: error.message },
  });
};

