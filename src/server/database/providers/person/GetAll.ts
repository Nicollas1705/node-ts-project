// !!!

import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';

// * Interact directly to DB
export const getAll = async (page: number, limit: number, filter: string): Promise<IPerson[] | Error> => {
  try {
    const result = await Knex(ETableName.person)
      .select('*')
      .where('name', 'LIKE', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Get: error DB');
  }
};
