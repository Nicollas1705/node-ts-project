// !!!

import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex'; // ! Remember to import 'Knex' from internal, not from 'knex' lib
import { ICityUpdate } from '../../models';

const tableName = ETableName.city;

// * Interact directly to DB
export const updateById = async (id: number, city: ICityUpdate): Promise<void | Error> => {
  try {
    // * Note: if it has a FK pointing to another table, it needs to check if this pointing exists there making a query

    const checkExists = await Knex(tableName).where('id', '=', id);
    if (checkExists.length === 0) return Error(`Update: id not found (${id})`);

    // Knex('city').insert({ ... }); // * Autocompleted even typing strings
    const result = await Knex(tableName)
      .update(city)
      .where('id', '=', id);

    if (result <= 0) return Error('Update: invalid result'); // Check if succeeds (result can be 0 or 1)
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Update: error DB');
  }
};
