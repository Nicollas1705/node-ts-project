import { crashLogger } from '../../../shared/services/CrashLogger';
import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';

const tableName = ETableName.user;

export const getByEmail = async (email: string): Promise<IUser | Error> => {
  try {
    const check = await Knex(tableName).where('email', '=', email);
    if (check.length === 0) return Error(`Get: email not found (${email})`);

    const result = await Knex(tableName)
      .select('*')
      .where('email', '=', email)
      .first();

    if (result) return result;

    return Error('Get: invalid result');
  } catch (error) {
    crashLogger(error);
    return Error('Get: error DB');
  }
};
