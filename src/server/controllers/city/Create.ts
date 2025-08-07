// !!!

import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICityCreate } from '../../database/models';
import { CityProvider } from '../../database/providers/city';
import { defaultErrorResponse } from '../../utils/utils';
import { YupValidations } from '../../shared/services/YupValidations';

interface IBodyProps extends ICityCreate {} // As ICityCreate is ignoring 'id', the validation will not show error when 'id' field is missing

// * Set 'T' (of GetAllSchemas) as 'AnyObject' to not infer the type according to internal interface set on getSchema
export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({ // Use the interface to infer the type here
    name: YupValidations.name,
  })),
}));

// * RequestHandler<{}, {}, ICity> IS THE SAME OF (req: Request<{}, {}, ICity>, res: Response, next: NextFunction) => { ... }
// 'next' param is the callback after middleware
export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => { // * The 3º generic type is interface to infer the BODY is ICity
// export const create: RequestHandler<{}, {}, ICity> = async (req, res) => {
  // console.log(req.body.name); // * The 'name' is autocompleted since it has a type

  const result = await CityProvider.create(req.body); // * Abstraction to interect to DB

  if (result instanceof Error) return defaultErrorResponse(res, result);

  return res.status(StatusCodes.CREATED).json(result);
};
