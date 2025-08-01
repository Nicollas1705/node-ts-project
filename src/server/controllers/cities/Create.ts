// !!!

import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

interface ICity {
  name: string;
}

// * Set 'T' (of GetAllSchemas) as 'AnyObject' to not infer the type according to internal interface set on getSchema
export const createValidation = validation((getSchema) => ({
  body: getSchema<ICity>(yup.object().shape({ // Use the interface to infer the type here
    name: yup.string().required('name é obrigatório (tradução local)').min(3),
  })),
}));

// * RequestHandler<{}, {}, ICity> IS THE SAME OF (req: Request<{}, {}, ICity>, res: Response, next: NextFunction) => { ... }
// 'next' param is the callback after middleware
export const create = async (req: Request<{}, {}, ICity>, res: Response) => { // * The 3º generic type is interface to infer the BODY is ICity
// export const create: RequestHandler<{}, {}, ICity> = async (req, res) => {
  // console.log(req.body.name); // * The 'name' is autocompleted since it has a type
  return res.status(StatusCodes.NOT_IMPLEMENTED).send('Error');
};
