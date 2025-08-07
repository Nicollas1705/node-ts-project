import * as create from './Create';
import * as getById from './GetByEmail';

export const UserProvider = {
  ...create,
  ...getById,
};
