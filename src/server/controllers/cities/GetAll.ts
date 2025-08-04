import { RequestHandler } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

interface IQueryProps {
  filter?: string;
  page?: number;
  limit?: number;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
  })),
}));

export const getAll: RequestHandler<{}, {}, {}, IQueryProps> = async (req, res) => { // * The 4º generic type is interface to infer the QUERY is IQueryProps
  console.log(req.query.page); // * The 'page' is autocompleted since it has a type
  return res.status(StatusCodes.NOT_IMPLEMENTED).send('OK');
};
