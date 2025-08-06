import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { ICity } from '../../database/models';
import { CityProvider } from '../../database/providers/city';
import { defaultErrorResponse } from '../../utils/utils';
import { YupValidations } from '../../shared/services/YupValidations';

interface IParamProps {
  id?: number; // * Ensure it is nullable, and make the validation required if needed
}

// interface IBodyProps extends ICity {} // With the models created, it will be extended to props
// * BUT, as the ICity needs an ID, that is not used in body props, we can use Omit to ignore this field
interface IBodyProps extends Omit<ICity, 'id'> {} // As it is ignoring 'id', the validation will not show error

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: YupValidations.id,
  })),
  body: getSchema<IBodyProps>(yup.object().shape({
    name: YupValidations.name,
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id) return defaultErrorResponse(res, Error('Invalid ID'));

  const result = await CityProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) return defaultErrorResponse(res, result);

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
