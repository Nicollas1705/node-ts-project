import { ETableName } from '../../ETableNames';
import { Knex } from '../../knex';

export const count = async (filter: string = ''): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableName.person)
      .select('*')
      .where('name', 'LIKE', `%${filter}%`)
      .count<[{ count: number }]>('* as count');

    if (Number.isInteger(Number(count))) return Number(count);

    throw Error('Count: invalid result');
  } catch (error) {
    console.log(error); // TODO: search for monitoring Node apps with logs
    return Error('Count: error DB');
  }
};
