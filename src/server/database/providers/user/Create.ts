import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';

export const create = async (user: Omit<IUser, 'id'>): Promise<number | Error> => { // TODO: separate the Omit in an interface
  try {
    const [result] = await Knex(ETableName.user)
      .insert(user)
      .returning('id');

    if (typeof result === 'object') return result.id;
    if (typeof result === 'number') return result;

    return Error('Create: invalid result');
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Create: error DB');
  }
};
