import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';

const tableName = ETableName.city;

// * Interact directly to DB
export const getById = async (id: number): Promise<ICity | Error> => {
  try {
    const check = await Knex(tableName).where('id', '=', id);
    if (check.length === 0) return Error(`Get: id not found (${id})`);

    // Knex('city').insert({ ... }); // * Autocompleted even typing strings
    const result = await Knex(tableName) // ! Remember that to 'result' has a type, it needs to be set on '@types/knex.d.ts' file
      .select('*')
      .where('id', '=', id)
      .first(); // Only the first value

    if (result) return result; // Check since 'result' can be 'undefined'

    return Error('Get: invalid result');
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Get: error DB');
  }
};
