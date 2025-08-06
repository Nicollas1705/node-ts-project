// RUN SERVER: npx ts-node-dev ./src/index.ts
// GENERATE JS: npx tsc
// RUN JS SERVER: node ./build/index.js
// If the server start and close with no error message, check if there is already another node instance running behind:
// lsof -i :PORT (like: >lsof -i :3333)
// If so, kill it with the command: kill PID (like: >kill 12345)

// Libs used for tests: >npm add -D jest ts-jest @types/jest
// Init tests config: >npm init jest@latest
// If it asks, install 'create-jest' lib. Check out 'jest.config.ts' file and compare configs
// Run tests: >npm test

import { server } from './server/Server';
import { Knex } from './server/database/knex';

const startServer = () => {
  const port = process.env.PORT || 3333;
  server.listen(port, () => console.log(`RUNNING SERVER AT ${port} PORT!`));
};

if (process.env.IS_LOCALHOST !== 'true') { // * Only when running in server (Heroku, AWS, ...), because local we could test migrations without problems
  Knex.migrate.latest().then(() => { // * Run migrations before server starts (used to auto run for production)
    startServer();
  }).catch(console.log); // TODO: search for monitoring Node apps with logs
} else {
  startServer();
}
