import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../../jest.setup';

describe('Cities - GetAll', () => {
  describe('should succeeds', () => {
    it('with more than 0 results', async () => {
      const res0 = await testServer.post('/cities').send({ 'name': 'test' });

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);

      const res1 = await testServer.get('/cities').send();

      expect(res1.statusCode).toEqual(StatusCodes.OK);
      expect(res1.body.length).toBeGreaterThan(0);
      expect(Number(res1.headers['x-total-count'])).toBeGreaterThan(0); // * Total length on DB returned
    });
  });
});
