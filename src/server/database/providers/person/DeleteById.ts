import { crashLogger } from '../../../shared/services/CrashLogger';
import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';

const tableName = ETableName.person;

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const checkExists = await Knex(tableName).where('id', '=', id);
    if (checkExists.length === 0) return Error(`Delete: id not found (${id})`);

    const result = await Knex(tableName)
      .where('id', '=', id)
      .delete();

    if (result <= 0) return Error('Delete: invalid result');
  } catch (error) {
    crashLogger(error);
    return Error('Delete: error DB');
  }
};
