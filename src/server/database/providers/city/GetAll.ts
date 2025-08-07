// !!!

import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';

const tableName = ETableName.city;

// * Interact directly to DB
export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICity[] | Error> => { // * List of ICity
  try {
    // Knex('city').insert({ ... }); // * Autocompleted even typing strings
    const result = await Knex(tableName)
      .select('*')
      .where('id', '=', Number(id)) // * Convert to 'number' type. The '=' is optional, can use also: .where('column', value)
      .orWhere('name', 'LIKE', `%${filter}%`) // * All 'name' that contains 'filter'
      .offset((page - 1) * limit) // * Pagination: skipping the first few pages
      .limit(limit); // * Pagination: the next X rows after skip

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(tableName)
        .select('*')
        .where('id', '=', id)
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Get: error DB');
  }
};
