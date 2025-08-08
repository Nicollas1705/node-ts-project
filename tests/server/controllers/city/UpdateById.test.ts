import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../../jest.setup';
import { mockTempHeaders, validCity } from '../../../mocks/mocks';

describe('City - UpdateById', () => {
  describe('should succeeds', () => {
    it('with valid request', async () => {
      const res0 = await testServer.post('/cities').set(mockTempHeaders).send(validCity());

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const res1 = await testServer.put(`/cities/${res0.body}`)
        .set(mockTempHeaders)
        .send({ 'name': 'new name' });

      expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
  });

  describe('should fail', () => {
    it('with no auth', async () => {
      const res0 = await testServer.post('/cities').set(mockTempHeaders).send(validCity());

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const res1 = await testServer.put(`/cities/${res0.body}`)
        .send({ 'name': 'new name' });

      expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(res1.body).toHaveProperty('errors.default');
      expect(res1.body.errors.default).toContain('Auth required');
    });

    it('with invalid name', async () => {
      const res0 = await testServer.post('/cities').set(mockTempHeaders).send(validCity());

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const res1 = await testServer.put(`/cities/${res0.body}`)
        .set(mockTempHeaders)
        .send({ name: 'na' });

      expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res1.body).toHaveProperty('errors.body.name');
      expect(res1.body.errors.body.name).toContain('>= 3');
    });

    it('with no name', async () => {
      const res0 = await testServer.post('/cities').set(mockTempHeaders).send(validCity());

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const res1 = await testServer.put(`/cities/${res0.body}`).set(mockTempHeaders).send();

      expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res1.body).toHaveProperty('errors.body.name');
      expect(res1.body.errors.body.name).toContain('required');
    });

    it('with invalid text id', async () => {
      const res0 = await testServer.put('/cities/string').set(mockTempHeaders).send(validCity());

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.params.id');
      expect(res0.body.errors.params.id).toContain('must be a `number`');
    });

    it('with decimal id', async () => {
      const res0 = await testServer.put('/cities/1.1').set(mockTempHeaders).send(validCity());

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.params.id');
      expect(res0.body.errors.params.id).toContain('must be an integer');
    });

    it('with 0 id', async () => {
      const res0 = await testServer.put('/cities/0').set(mockTempHeaders).send(validCity());

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.params.id');
      expect(res0.body.errors.params.id).toContain('must be greater than 0');
    });
    
    it('with non-existent id', async () => {
      const res0 = await testServer.put('/cities/9999').set(mockTempHeaders).send(validCity());

      expect(res0.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res0.body).toHaveProperty('errors.default');
    });
  });
});
