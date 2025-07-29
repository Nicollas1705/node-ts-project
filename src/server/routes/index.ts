import { Router } from 'express';
import { StatusCodes } from 'http-status-codes'; // Package to simplify status code

const router = Router();

router.post('/body', (req, res) => {
  console.log(`BODY: ${req.body}`);
  return res.send(req.body.message);
});

router.get('/param/:param', (req, res) => {
  console.log(`PARAM: ${req.params.param}`);
  return res.send(req.params.param);
});

router.get('/query', (req, res) => {
  console.log(`QUERY: ${req.query.test}`);
  return res.send(req.query.test);
});

router.get('/error', (req, res) => {
  console.log('Error');
  // return res.status(404).send();
  return res.status(StatusCodes.NOT_FOUND).send('Error'); // StatusCodes.NOT_FOUND = 404
});

export { router };
