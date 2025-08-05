import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';

// * Interact directly to DB
export const count = async (filter: string = ''): Promise<number | Error> => {
  try {
    // Knex('city').insert({ ... }); // * Autocompleted even typing strings
    const [{ count }] = await Knex(ETableName.city)
      .select('*')
      .where('name', 'LIKE', `%${filter}%`)
      .count<[{ count: number }]>('* as count'); // * The total rows with the filter. The '<>' is used to force the type

    if (Number.isInteger(Number(count))) return Number(count);

    throw Error('Count: invalid result');
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Count: error DB');
  }
};
