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

server.listen(process.env.PORT || 3333, () => console.log('RUNNING APP!!!'));
