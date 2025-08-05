// !!!

import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex'; // ! Remember to import 'Knex' from internal, not from 'knex' lib
import { ICity } from '../../models';

// * Interact directly to DB
export const updateById = async (id: number, city: Omit<ICity, 'id'>): Promise<void | Error> => { // TODO: separate the Omit in a interface
  try {
    const check = await Knex(ETableName.city).where('id', '=', id);

    if (check.length === 0) throw Error(`Delete: id not found (${id})`);

    // Knex('city').insert({ ... }); // * Autocompleted even typing strings
    const result = await Knex(ETableName.city)
      .update(city)
      .where('id', '=', id);

    if (result <= 0) throw Error('Delete: invalid result'); // Check if succeeds (result can be 0 or 1)
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Update: error DB');
  }
};
