import express from 'express';
import './shared/services/YupTranslations'; // To set yup translations // ! Remember to import it first (before yup Scheme is set)
import { router } from './routes';
import cors from 'cors';
import 'dotenv/config'; // To use .env file

const server = express();

// * CORS (Cross-Origin Resource Sharing): used to allow/deny browser requests to server
// * Note: it doesnt prevent attacks, since the block is made by frontend who is making the requests, not by server itself
// * Remember to add the addresses (like 'http://localhost:3000') to CORS list when running the frontend
// * To test if CORS is set, run the below command in browser console (on www.google.com for example) (try on chrome and deactive adblockers!)
// > fetch('http://localhost:3333').then(data => data.json()).then(console.log).catch(console.log)
// If returns 'Access-Control-Allow-Origin': Access to fetch at 'http://localhost:3333/' from origin 'https://www.google.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
// Then it is successfully blocked by CORS
server.use(cors({
  origin: process.env.ENABLED_CORS?.split(';') || [], // * The addesses allowed to request to server (like: 'https://www.google.com' (no '/' at end))
  // * As the frontend requests has no fixed address, it is got by env variables
  // origin: [],
}));

server.use(express.json());

server.use(router);

export { server };
