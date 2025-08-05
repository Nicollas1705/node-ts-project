import express from 'express';
import './shared/services/YupTranslations'; // To set yup translations // ! Remember to import it first (before yup Scheme is set)
import { router } from './routes';
import 'dotenv/config'; // To use .env file

const server = express();

server.use(express.json());

server.use(router);

export { server };
