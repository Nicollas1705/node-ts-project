// !!!

import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex'; // ! Remember to import 'Knex' from internal, not from 'knex' lib
import { ICity } from '../../models';

// * Interact directly to DB
export const updateById = async (id: number, city: Omit<ICity, 'id'>): Promise<void | Error> => { // TODO: separate the Omit in an interface
  try {
    // * Note: if it has a FK pointing to another table, it needs to check if this pointing exists there making a query

    const checkExists = await Knex(ETableName.city).where('id', '=', id);
    if (checkExists.length === 0) throw Error(`Update: id not found (${id})`);

    // Knex('city').insert({ ... }); // * Autocompleted even typing strings
    const result = await Knex(ETableName.city)
      .update(city)
      .where('id', '=', id);

    if (result <= 0) throw Error('Update: invalid result'); // Check if succeeds (result can be 0 or 1)
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Update: error DB');
  }
};
