// !!!

import { Knex } from 'knex';
import path from 'path';

// * DB env configs (check out knexjs.org)

export const development: Knex.Config = { // * Ensure to use the correct variable name 'development'
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite') // The file will be created after running
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
  pool: { // * Only set when using sqlite, due to knex doesnt have support to foreign key
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-function-type
    afterCreate: (connection: any, done: Function) => {
      connection.run('PRAGMA foreign_keys = ON'); // Enable FK on DB
      done();
    },
  },
};

export const production: Knex.Config = { // * Ensure to use the correct variable name 'production'
  ...development,
};

export const test: Knex.Config = { // * Ensure to use the correct variable name 'test'
  ...development,
  connection: ':memory:'
};
