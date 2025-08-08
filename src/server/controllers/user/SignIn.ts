// !!!

import { RequestHandler } from 'express';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { UserProvider } from '../../database/providers/user';
import { defaultErrorResponse } from '../../utils/utils';
import { YupValidations } from '../../shared/services/YupValidations';
import { IUser } from '../../database/models';
import { JwtError, JwtService, PassCrypt } from '../../shared/services';

interface IBodyProps extends Omit<IUser, 'id' | 'name'> {}

// ! Due to be sensitive data (email + password), pass them by body (it encrypts the data)
export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: YupValidations.email,
    password: YupValidations.text, // * Dont validating password here
  })),
}));

export const signIn: RequestHandler<{}, {}, IBodyProps> = async (req, res) => {
  const { email, password } = req.body; // * Destruction from body to 'email' and 'password'
  const user = await UserProvider.getByEmail(email);

  const errorResponse = () =>
    defaultErrorResponse(res, Error('Invalid login'), StatusCodes.UNAUTHORIZED); // ! Dont specify what field got error

  if (user instanceof Error) return errorResponse();

  const isValidPassword = await PassCrypt.verifyPassword(password, user.password);

  if (!isValidPassword) return errorResponse();

  const accessToken = JwtService.sign({ userId: user.id });
  if (accessToken === JwtError.secretNotFound) { // * Check if JWT was corretly generated
    return defaultErrorResponse(res, Error(accessToken));
  }

  return res.status(StatusCodes.OK).json({ accessToken });
};
