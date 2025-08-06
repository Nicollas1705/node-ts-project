import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';

export const getById = async (id: number): Promise<IPerson | Error> => {
  try {
    const check = await Knex(ETableName.person).where('id', '=', id);
    
    if (check.length === 0) throw Error(`Get: id not found (${id})`);

    const result = await Knex(ETableName.person)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    throw Error('Get: invalid result');
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Get: error DB');
  }
};
