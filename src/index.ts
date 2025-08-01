// RUN SERVER: npx ts-node-dev ./src/index.ts
// RUN JS SERVER: node ./build/index.js
// GENERATE JS: npx tsc
// If the server start and close with no error message, check if there is already another node instance running behind:
// lsof -i :PORT (like: lsof -i :3333)
// If so, kill it with the command: kill PID (like: kill 12345)

import { server } from './server/Server';

server.listen(process.env.PORT || 3333, () => console.log('RUNNING APP!!!'));
