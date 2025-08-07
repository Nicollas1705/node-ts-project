import { crashLogger } from '../../../shared/services/CrashLogger';
import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';
import {  IPersonCreate } from '../../models';
import { CityProvider } from '../city';

const tableName = ETableName.person;

export const create = async (person: IPersonCreate): Promise<number | Error> => {
  try {
    const checkExistsCity = await CityProvider.getById(person.cityId);
    if (checkExistsCity instanceof Error) return Error('Create: invalid city ID');

    const [result] = await Knex(tableName)
      .insert(person)
      .returning('id');

    if (typeof result === 'object') return result.id;
    if (typeof result === 'number') return result;

    return Error('Create: invalid result');
  } catch (error) {
    crashLogger(error);
    return Error('Create: error DB');
  }
};
