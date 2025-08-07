// !!!

// * Seeds are used to populate DB with data (like enums, country states)
// * It is always executed
// * Follow the same way of migrations, with files been called in sequence (due to this, the initial numbers on file name)

import { Knex } from 'knex';
import { ETableName } from '../ETableNames';

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableName.city).count<[{ count: number }]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) return; // * Since 'seeds' is always executed, it ensures that only exec when DB is empty

  const citiesToInsert = someCities.map(city => ({ name: city }));

  await knex(ETableName.city).insert(citiesToInsert);
};

const someCities = [
  'Rio Branco',
  'Maceió',
  'Macapá',
  'Manaus',
  'Salvador',
  'Fortaleza',
  'Brasília',
  'Vitória',
  'Goiânia',
  'São Luís',
  'Cuiabá',
  'Campo Grande',
  'Belo Horizonte',
  'Belém',
  'João Pessoa',
  'Curitiba',
  'Recife',
  'Teresina',
  'Rio de Janeiro',
  'Natal',
  'Porto Alegre',
  'Porto Velho',
  'Boa Vista',
  'Florianópolis',
  'São Paulo',
  'Aracaju',
  'Palmas',
];
