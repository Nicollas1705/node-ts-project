// !!!

import { crashLogger } from '../../../shared/services/CrashLogger';
import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex'; // ! Remember to import 'Knex' from internal, not from 'knex' lib
import { ICity } from '../../models';

const tableName = ETableName.city;

// interface ICityCreate extends ICity {} // With the models created, it will be extended
// * BUT, as the ICity needs an ID, that is not used in creation, we can use Omit to ignore this field
export interface ICityCreate extends Omit<ICity, 'id'> {} // As it is ignoring 'id', the validation will not show error when missing 'id'
// * Interface used only to have an easier way to create
// * Note: to Omit more fields, use: Omit<Interface, 'field1' | 'field2'>

// * Interact directly to DB
export const create = async (city: ICityCreate): Promise<number | Error> => {
  try {
    // * Note: if it has a FK pointing to another table, it needs to check if this pointing exists there making a query

    // Knex('city').insert({ ... }); // * Autocompleted even typing strings
    const [result] = await Knex(tableName) // * With the types set on 'database/knex', we have autocomplete here (for table and column names)
      .insert(city)
      .returning('id'); // What will be returned after insert
      // * Note: it can insert multiple rows, then it returns multiple IDs in a list, due to this, 'const [result]' is used

    // Comparison due to use different DBs on dev and prod (sqlite + postgress)
    if (typeof result === 'object') return result.id;
    if (typeof result === 'number') return result;

    return Error('Create: invalid result');
  } catch (error) {
    crashLogger(error);
    return Error('Create: error DB');
  }
};
