// !!!

import { PassCrypt } from '../../../shared/services';
import { crashLogger } from '../../../shared/services/CrashLogger';
import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';

const tableName = ETableName.user;

export interface IUserCreate extends Omit<IUser, 'id'> {}

export const create = async (user: IUserCreate): Promise<number | Error> => {
  try {
    user.password = await PassCrypt.hashPassword(user.password); // ! Encript the password before create
    // * If the user has an Update method, remember to encript there too

    const [result] = await Knex(tableName)
      .insert(user)
      .returning('id');

    if (typeof result === 'object') return result.id;
    if (typeof result === 'number') return result;

    return Error('Create: invalid result');
  } catch (error) {
    crashLogger(error);
    return Error('Create: error DB');
  }
};
