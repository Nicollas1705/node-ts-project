import { crashLogger } from '../../../shared/services/CrashLogger';
import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';

const tableName = ETableName.person;

export const getById = async (id: number): Promise<IPerson | Error> => {
  try {
    const check = await Knex(tableName).where('id', '=', id);
    if (check.length === 0) return Error(`Get: id not found (${id})`);

    const result = await Knex(tableName)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return Error('Get: invalid result');
  } catch (error) {
    crashLogger(error);
    return Error('Get: error DB');
  }
};
