import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../../jest.setup';
import { validCity, validPerson } from '../../../mocks/mocks';

describe('People - GetAll', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const response = await testServer.post('/cities').send(validCity());
    cityId = response.body;
  });

  describe('should succeeds', () => {
    it('with more than 0 results', async () => {
      const res0 = await testServer.post('/people').send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const res1 = await testServer.get('/people').send();

      expect(res1.statusCode).toEqual(StatusCodes.OK);
      expect(res1.body.length).toBeGreaterThan(0);
      expect(Number(res1.headers['x-total-count'])).toBeGreaterThan(0);
    });
  });
});
