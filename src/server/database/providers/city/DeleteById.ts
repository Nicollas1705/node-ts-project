import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';

// * Interact directly to DB
export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const check = await Knex(ETableName.city).where('id', '=', id);

    if (check.length === 0) throw Error(`Delete: id not found (${id})`);

    // Knex('city').insert({ ... }); // * Autocompleted even typing strings
    const result = await Knex(ETableName.city)
      .where('id', '=', id)
      .delete();

    if (result <= 0) throw Error('Delete: invalid result'); // Check if succeeds (result can be 0 or 1)
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Delete: error DB');
  }
};
