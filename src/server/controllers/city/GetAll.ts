import { RequestHandler } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { CityProvider } from '../../database/providers/city';
import { defaultErrorResponse } from '../../utils/utils';
import { YupValidations } from '../../shared/services/YupValidations';

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    id: yup.number().integer().required().default(0), // * Default value
    page: YupValidations.intPositiveOptional,
    limit: YupValidations.intPositiveOptional,
    filter: YupValidations.textOptional,
  })),
}));

export const getAll: RequestHandler<{}, {}, {}, IQueryProps> = async (req, res) => { // * The 4º generic type is interface to infer the QUERY is IQueryProps
  // console.log(req.query.page); // * The 'page' is autocompleted since it has a type

  const filter = req.query.filter ?? '';
  const result = await CityProvider
    .getAll(req.query.page ?? 1, req.query.limit ?? 10, filter, Number(req.query.id));
  const totalCount = await CityProvider.count(filter);

  if (result instanceof Error) return defaultErrorResponse(res, result);
  if (totalCount instanceof Error) return defaultErrorResponse(res, totalCount);

  res.setHeader('access-control-expose-headers', 'x-total-count'); // * To expose field to browser
  res.setHeader('x-total-count', totalCount); // * Total length on DB returned

  return res.status(StatusCodes.OK).json(result);
};
