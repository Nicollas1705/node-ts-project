import { RequestHandler } from 'express';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { IPersonUpdate } from '../../database/providers/person/UpdateById';
import { PersonProvider } from '../../database/providers/person';
import { defaultErrorResponse } from '../../utils/utils';
import { YupValidations } from '../../shared/services/YupValidations';

interface IParamProps {
  id?: number;
}

interface IBodyProps extends IPersonUpdate {}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: YupValidations.id,
  })),
  body: getSchema<IBodyProps>(yup.object().shape({
    name: YupValidations.name.optional(), // * Forcing to be optional due to this being an 'Update' in which can be passed only one field for example
    email: YupValidations.email.optional(),
    cityId: YupValidations.id.optional(),
  })),
}));

export const updateById: RequestHandler<IParamProps, {}, IBodyProps> = async (req, res) => {
  if (!req.params.id) return defaultErrorResponse(res, Error('Invalid ID'));

  const result = await PersonProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) return defaultErrorResponse(res, result);

  return res.status(StatusCodes.NO_CONTENT).send();
};
