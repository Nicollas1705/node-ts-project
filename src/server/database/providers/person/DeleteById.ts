import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const checkExists = await Knex(ETableName.person).where('id', '=', id);
    if (checkExists.length === 0) throw Error(`Delete: id not found (${id})`);

    const result = await Knex(ETableName.person)
      .where('id', '=', id)
      .delete();

    if (result <= 0) throw Error('Delete: invalid result');
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Delete: error DB');
  }
};
