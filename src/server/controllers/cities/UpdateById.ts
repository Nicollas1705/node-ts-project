import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { ICity } from '../../database/models';
import { CitiesProvider } from '../../database/providers/city';
import { defaultErrorResponse } from '../../utils/utils';

interface IParamProps {
  id?: number; // * Ensure it is nullable, and make the validation required if needed
}

// interface IBodyProps extends ICity {} // With the models created, it will be extended to props
// * BUT, as the ICity needs an ID, that is not used in body props, we can use Omit to ignore this field
interface IBodyProps extends Omit<ICity, 'id'> {} // As it is ignoring 'id', the validation will not show error

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3).max(150),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  const result = await CitiesProvider.updateById(req.params.id!, req.body);

  if (result instanceof Error) return defaultErrorResponse(res, result);

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
