import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../../jest.setup';
import { mockTempHeaders, validCity } from '../../../mocks/mocks';

describe('City - Create', () => {
  describe('should succeeds', () => {
    it('with valid request', async () => {
      const res0 = await testServer.post('/cities')
        .set(mockTempHeaders) // * Set authorization to use accessToken, making a request logged in
        .send(validCity());

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');
    });
  });

  describe('should fail', () => {
    it('with no auth', async () => {
      const res0 = await testServer.post('/cities')
        .send(validCity());

      expect(res0.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(res0.body).toHaveProperty('errors.default');
      expect(res0.body.errors.default).toContain('Auth required');
    });

    it('with short name', async () => {
      const res0 = await testServer.post('/cities')
        .set(mockTempHeaders)
        .send({ 'name': 'Ci' });

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.name');
      expect(res0.body.errors.body.name).toContain('>= 3');
    });

    it('with no name', async () => {
      const res0 = await testServer.post('/cities')
        .set(mockTempHeaders)
        .send();

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.name');
      expect(res0.body.errors.body.name).toContain('required');
    });
  });
});
