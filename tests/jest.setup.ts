// !!!

// * Tests setup (created manually): used to run initial setup for tests

import supertest from 'supertest';
import { server } from '../src/server/Server';
import { Knex } from '../src/server/database/knex'; // ! Remember to use Knex from 'database/knex'
import { setAuthorization, validUser } from './mocks/mocks';

beforeAll(async () => {
  await Knex.migrate.latest(); // * Await the 'migrate' run to run tests. It initializes the test DB in ':memory:' (as set in env)
  await Knex.seed.run(); // * Await to populate initial DB data

  // ! As the requests need to be logged in to access, here is created a new user to be used on tests
  const user = validUser();
  await testServer.post('/register').send(user);
  const response = await testServer.post('/sign-in').send(user); // * Get accessToken firstly
  setAuthorization(response.body.accessToken); // * Set token to test requests while logged in
});

afterAll(async () => {
  await Knex.destroy(); // * Disconnect DB from Knex when tests is done
});

export const testServer = supertest(server);
