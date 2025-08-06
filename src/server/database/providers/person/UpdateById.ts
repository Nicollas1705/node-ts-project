import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';
import { CityProvider } from '../city';

export const updateById = async (id: number, person: Omit<IPerson, 'id'>): Promise<void | Error> => { // TODO: separate the Omit in an interface
  try {
    const checkExists = await Knex(ETableName.person).where('id', '=', id);
    if (checkExists.length === 0) throw Error(`Update: id not found (${id})`);

    const checkExistsCity = await CityProvider.getById(person.cityId);
    if (checkExistsCity instanceof Error) throw Error('Update: invalid city ID');

    const result = await Knex(ETableName.person)
      .update(person)
      .where('id', '=', id);

    if (result <= 0) throw Error('Update: invalid result');
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Update: error DB');
  }
};
