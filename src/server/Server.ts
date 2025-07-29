import express from 'express';
import { router } from './routes';
import 'dotenv/config'; // To use .env file

const server = express();

server.use(express.json());

server.use(router);

export { server };
