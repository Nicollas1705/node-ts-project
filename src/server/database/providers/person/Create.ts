import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';
import { CityProvider } from '../city';

export const create = async (person: Omit<IPerson, 'id'>): Promise<number | Error> => { // TODO: separate the Omit in an interface
  try {
    const checkExistsCity = await CityProvider.getById(person.cityId);
    if (checkExistsCity instanceof Error) throw Error('Create: invalid city ID');

    const [result] = await Knex(ETableName.person)
      .insert(person)
      .returning('id');

    if (typeof result === 'object') return result.id;
    if (typeof result === 'number') return result;

    throw Error('Create: invalid result');
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Create: error DB');
  }
};
