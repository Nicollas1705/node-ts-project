// RUN SERVER: npx ts-node-dev ./src/index.ts

import { server } from './server/Server';

server.listen(process.env.PORT || 3333, () => console.log('RUNNING APP!!!'));
