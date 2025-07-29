// RUN SERVER: npx ts-node-dev ./src/index.ts
// RUN JS SERVER: node ./build/index.js
// GENERATE JS: npx tsc

import { server } from './server/Server';

server.listen(process.env.PORT || 3333, () => console.log('RUNNING APP!!!'));
