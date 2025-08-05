import knex from 'knex';
import { development, production, test } from './Environment';

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
