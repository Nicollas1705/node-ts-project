// !!!

import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex'; // ! Remember to import 'Knex' from internal, not from 'knex' lib
import { ICity } from '../../models';

// * Interact directly to DB
export const create = async (city: Omit<ICity, 'id'>): Promise<number | Error> => { // TODO: separate the Omit in a interface
  try {
    // Knex('city').insert({ ... }); // * Autocompleted even typing strings
    const [result] = await Knex(ETableName.city) // * With the types set on 'database/knex', we have autocomplete here (for table and column names)
      .insert(city)
      .returning('id'); // What will be returned after insert
      // * Note: it can insert multiple rows, then it returns multiple IDs in a list, due to this, 'const [result]' is used

    // Comparison due to use different DBs on dev and prod (sqlite + postgress)
    if (typeof result === 'object') return result.id;
    if (typeof result === 'number') return result;

    throw Error('Create: invalid result');
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Create: error DB');
  }
};
