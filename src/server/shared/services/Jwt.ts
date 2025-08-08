// !!!

import * as jwt from 'jsonwebtoken';
// ! JWT has no encryptation, dont put any sensitive data into there

export enum JwtError {
  secretNotFound = 'JWT_SECRET_NOT_FOUND',
  invalidToken = 'INVALID_JWT_TOKEN',
}

export class JwtNotFoundError extends Error {}

export class JwtTokenInvalidError extends Error {}

interface IJwdData {
  userId: number;
}

const sign = (data: IJwdData): string | JwtError.secretNotFound => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return JwtError.secretNotFound; // * Check if the JWT_SECRET is se in '.env' file

  return jwt.sign(
    data, // * Data that will be hashed
    jwtSecret, // * Internal secret
    {
      expiresIn: '24h', // * JWT expires in 24h
    },
  );
};

const verify = (token: string): IJwdData | JwtError.invalidToken | JwtError.secretNotFound => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return JwtError.secretNotFound;

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (typeof decoded === 'string') return JwtError.invalidToken; // * string means that couldnt decode token

    return decoded as IJwdData;
  } catch {
    return JwtError.invalidToken;
  }
};

export const JwtService = {
  sign,
  verify,
};
