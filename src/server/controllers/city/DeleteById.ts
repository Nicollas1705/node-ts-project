import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { CityProvider } from '../../database/providers/city';
import { defaultErrorResponse } from '../../utils/utils';

interface IParamProps {
  id?: number; // * Ensure it is nullable, and make the validation required if needed
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  const result = await CityProvider.deleteById(req.params.id!);

  if (result instanceof Error) return defaultErrorResponse(res, result);

  return res.status(StatusCodes.NO_CONTENT).send();
};
