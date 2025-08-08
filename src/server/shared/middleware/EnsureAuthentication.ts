import { RequestHandler } from 'express';
import { defaultErrorResponse } from '../../utils/utils';
import { StatusCodes } from 'http-status-codes';
import { JwtError, JwtService } from '../services';

export const ensureAuth: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers; // * Get auth token from headers if it has

  const errorResponse = () => defaultErrorResponse(res, Error('Auth required'), StatusCodes.UNAUTHORIZED);
  // * 'errorResponse' is a function due to the Response cant be set here, since it can return another values (status, body, ...)

  if (!authorization) return errorResponse();

  const [ type, token ] = authorization.split(' '); // * Separate to get the type and the token from 'authorization'

  if (type !== 'Bearer') return errorResponse(); // * Check if the token type follows the Bearer pattern

  const jwtData = JwtService.verify(token); // * Check if JWT is valid

  if (jwtData === JwtError.invalidToken) return errorResponse(); // * Check if the token type follows the Bearer pattern

  if (jwtData === JwtError.secretNotFound) {
    return defaultErrorResponse(res, Error(JwtError.secretNotFound));
  }

  req.headers.userId = jwtData.userId.toString();
  // ! Insert user ID into REQUEST headers to be used in controllers/middlewares to check permissions and make validations
  // * In this case, only userId is encoded/decoded, but it could also insert more data into headers

  return next();
};
