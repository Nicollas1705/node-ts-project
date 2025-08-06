import { RequestHandler } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { PersonProvider } from '../../database/providers/person';
import { defaultErrorResponse } from '../../utils/utils';
import { YupValidations } from '../../shared/services/YupValidations';

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: YupValidations.intPositiveOptional,
    limit: YupValidations.intPositiveOptional,
    filter: YupValidations.textOptional,
  })),
}));

export const getAll: RequestHandler<{}, {}, {}, IQueryProps> = async (req, res) => {
  const filter = req.query.filter ?? '';
  const result = await PersonProvider.getAll(req.query.page ?? 1, req.query.limit ?? 10, filter);
  const totalCount = await PersonProvider.count(filter);

  if (result instanceof Error) return defaultErrorResponse(res, result);
  if (totalCount instanceof Error) return defaultErrorResponse(res, totalCount);

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', totalCount);

  return res.status(StatusCodes.OK).json(result);
};
