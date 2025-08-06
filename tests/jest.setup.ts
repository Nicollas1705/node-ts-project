// * Tests setup (created manually)

import supertest from 'supertest';
import { server } from '../src/server/Server';
import { Knex } from '../src/server/database/knex'; // ! Remember to use Knex from 'database/knex'

beforeAll(async () => {
  await Knex.migrate.latest(); // * Await the 'migrate' run to run tests. It initializes the test DB in ':memory:' (as set in env)
});

afterAll(async () => {
  await Knex.destroy(); // * Disconnect DB from Knex when tests is done
});

export const testServer = supertest(server);
