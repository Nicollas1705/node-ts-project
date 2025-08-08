import { compare, genSalt, hash } from 'bcryptjs';

const SALT_ROUNDS = 4; // * The bigger the number, the more complex (and havier to proccessor) to generate the 'salt' text
// ! It is not recomended to use a fixed 'SALT' in prod apps
// * If use fixed 'SALT', the users with the same password will result in the same hash, making it easier to crack

const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(SALT_ROUNDS);
  return await hash(password, salt);
};

const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await compare(password, hashedPassword);
};

export const PassCrypt = {
  hashPassword,
  verifyPassword,
};
