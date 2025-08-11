import { crashLogger } from '../../../shared/services/CrashLogger';
import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';

const tableName = ETableName.person;

export const count = async (filter: string = ''): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(tableName)
      .where('name', 'LIKE', `%${filter}%`)
      .count<[{ count: string }]>('* as count');

    if (Number.isInteger(Number(count))) return Number(count);

    return Error('Count: invalid result');
  } catch (error) {
    crashLogger(error);
    return Error('Count: error DB');
  }
};
