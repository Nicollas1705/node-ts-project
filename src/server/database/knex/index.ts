import knex from 'knex';
import { development, production, test } from './Environment';
import 'dotenv/config'; // * Force to initilize the env variables
import pg from 'pg';

const getDbFromEnv = () => {
  if (process.env.NODE_ENV === 'prod') { // * Due to PostgreSQL is only used in production
    // ! On Knex, the PostgreSQL number data is stored as string. To solve it, use 'setTypeParser'
    pg.types.setTypeParser(20, 'text', parseInt); // * Handle the type INT8 (TypeId = 20), to be parsed from 'text' in 'parseInt' function
  }
};

getDbFromEnv(); // * Remember to run it

const getEnv = () => {
  switch (process.env.NODE_ENV) { // NODE_ENV from .env file
    case 'prod':
      return production;
    case 'test':
      return test;
    default:
      return development;
  }
};

export const Knex = knex(getEnv());
