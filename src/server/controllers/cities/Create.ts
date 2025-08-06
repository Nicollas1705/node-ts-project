// !!!

import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICity } from '../../database/models';
import { CitiesProvider } from '../../database/providers/city';
import { defaultErrorResponse } from '../../utils/utils';

// interface IBodyProps extends ICity {} // With the models created, it will be extended to props
// * BUT, as the ICity needs an ID, that is not used in body props, we can use Omit to ignore this field
interface IBodyProps extends Omit<ICity, 'id'> {} // As it is ignoring 'id', the validation will not show error

// * Set 'T' (of GetAllSchemas) as 'AnyObject' to not infer the type according to internal interface set on getSchema
export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({ // Use the interface to infer the type here
    name: yup.string().required('name é obrigatório (tradução local)').min(3).max(150),
  })),
}));

// * RequestHandler<{}, {}, ICity> IS THE SAME OF (req: Request<{}, {}, ICity>, res: Response, next: NextFunction) => { ... }
// 'next' param is the callback after middleware
export const create = async (req: Request<{}, {}, ICity>, res: Response) => { // * The 3º generic type is interface to infer the BODY is ICity
// export const create: RequestHandler<{}, {}, ICity> = async (req, res) => {
  // console.log(req.body.name); // * The 'name' is autocompleted since it has a type

  const result = await CitiesProvider.create(req.body); // * Abstraction to interect to DB

  if (result instanceof Error) return defaultErrorResponse(res, result);

  return res.status(StatusCodes.CREATED).json(result);
};
