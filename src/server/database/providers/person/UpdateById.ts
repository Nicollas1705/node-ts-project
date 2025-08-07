import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPersonUpdate } from '../../models';
import { CityProvider } from '../city';

const tableName = ETableName.person;

export const updateById = async (id: number, person: IPersonUpdate): Promise<void | Error> => {
  try {
    const checkExists = await Knex(tableName).where('id', '=', id);
    if (checkExists.length === 0) return Error(`Update: id not found (${id})`);

    if (person.cityId) {
      const checkExistsCity = await CityProvider.getById(person.cityId);
      if (checkExistsCity instanceof Error) return Error('Update: invalid city ID');
    }

    const result = await Knex(tableName)
      .update(person)
      .where('id', '=', id);

    if (result <= 0) return Error('Update: invalid result');
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Update: error DB');
  }
};
