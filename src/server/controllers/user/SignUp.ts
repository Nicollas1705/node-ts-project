import { RequestHandler } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IUserCreate } from '../../database/providers/user/Create';
import { UserProvider } from '../../database/providers/user';
import { defaultErrorResponse } from '../../utils/utils';
import { YupValidations } from '../../shared/services/YupValidations';

interface IBodyProps extends IUserCreate {}

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: YupValidations.name,
    email: YupValidations.email,
    password: YupValidations.password,
  })),
}));

export const signUp: RequestHandler<{}, {}, IBodyProps> = async (req, res) => {
  const result = await UserProvider.create(req.body);

  if (result instanceof Error) return defaultErrorResponse(res, result);

  return res.status(StatusCodes.CREATED).send();
};
