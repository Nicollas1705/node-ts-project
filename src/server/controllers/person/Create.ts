// !!!

import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IPersonCreate } from '../../database/models';
import { PersonProvider } from '../../database/providers/person';
import { defaultErrorResponse } from '../../utils/utils';
import { YupValidations } from '../../shared/services/YupValidations';

interface IBodyProps extends IPersonCreate {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: YupValidations.name,
    email: YupValidations.email,
    cityId: YupValidations.id,
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await PersonProvider.create(req.body);

  if (result instanceof Error) return defaultErrorResponse(res, result);

  return res.status(StatusCodes.CREATED).json(result);
};
