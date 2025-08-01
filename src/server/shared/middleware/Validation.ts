// !!!

import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup';

// * 'GetSchema' and 'GetAllSchemas' is used to have a way to set the interface type into 'validation' method with 'getSchema<Interface>'
type GetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;
type GetAllSchemas = (getSchema: GetSchema) => Partial<AllSchemas<{}>>; // * As 'any' cant be used, use '{}' (object) to be a generic safe.
// * Partial: Since 'schemas' has the properties 'ReqProperty', it would require all fields. But 'Partial' turns all as optional.

type ReqProperty = 'body' | 'query' | 'params' | 'header';

type AllSchemas<T extends Maybe<AnyObject>> = Record<ReqProperty, ObjectSchema<T>>;

type MiddlewareValidation = (getAllSchemas: GetAllSchemas) => RequestHandler;

// * 'validation' is a fn that receives a fn as param (getAllSchemas) and returns another fn (RequestHandler)
// * Note: RequestHandler<{}, {}, ICity> IS THE SAME OF (req: Request<{}, {}, ICity>, res: Response, next: NextFunction) => { ... }
// * And the 'getAllSchemas' is a fn that receives a fn as param (getSchema) and returns all the schemas (AllSchemas) with optional fields
// * The 'getSchema' param is only used to ensure yup will return the correct type 'T' from 'GetSchema'.

// * THEN: 'MiddlewareValidation' is a fn that ruturns another fn (RequestHandler) that returns void
export const validation: MiddlewareValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas(getSchema => getSchema);
  const errorsResult: Record<string, Record<string, string>> = {};

  // * Object.entries: transform 'schemas' (object) into an Array of Arrays, with each array with 2 items [key, param] => [[k1, p1], [k2, p2], ...]
  const entries = Object.entries(schemas);

  // * Since each item is an Array (remember? Array of Arrays), it needs to use '[key, schema]' with '[]'
  entries.forEach(([key, schema]) => {
    const property = key as ReqProperty;
    try {
      schema.validateSync(req[property], {abortEarly: false});
    } catch (error) {
      if (!(error instanceof ValidationError)) throw error;

      // * console.log(error.errors); // 'error.errors' is an Array with all error messages (Array<string>)
      const validationErrors: Record<string, string> = {};
      error.inner.forEach(error => {
        // Check if it is not undefined
        if (error.path) validationErrors[error.path] = error.message; // * 'error.path' is the field name
      });

      errorsResult[key as ReqProperty] = validationErrors;
    }
  });

  if (Object.entries(errorsResult).length === 0) return next(); // No errors case

  return res.status(StatusCodes.BAD_REQUEST).json({errors: errorsResult});
};
