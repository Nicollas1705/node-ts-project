import { crashLogger } from '../../../shared/services/CrashLogger';
import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';

const tableName = ETableName.city;

// * Interact directly to DB
export const count = async (filter: string = ''): Promise<number | Error> => {
  try {
    // Knex('city').insert({ ... }); // * Autocompleted even typing strings
    const [{ count }] = await Knex(tableName)
      .where('name', 'LIKE', `%${filter}%`)
      .count<[{ count: string }]>('* as count'); // * The total rows with the filter. The '<>' is used to force the type
    // * In PostegreSQL, the 'count' could return as string in some cases, due to this, it is typed as object

    if (Number.isInteger(Number(count))) return Number(count);

    return Error('Count: invalid result');
  } catch (error) {
    crashLogger(error);
    return Error('Count: error DB');
  }
};
