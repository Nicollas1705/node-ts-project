import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../../jest.setup';

describe('City - DeleteById', () => {
  describe('should succeeds', () => {
    it('with valid request', async () => {
      const res0 = await testServer.post('/cities').send({ 'name': 'test' });

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);

      const res1 = await testServer.delete(`/cities/${res0.body}`).send();

      expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
  });

  describe('should fail', () => {
    it('with invalid text id', async () => {
      const res0 = await testServer.delete('/cities/string').send();

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.params.id');
      expect(res0.body.errors.params.id).toContain('must be a `number`');
    });

    it('with decimal id', async () => {
      const res0 = await testServer.delete('/cities/1.1').send();

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.params.id');
      expect(res0.body.errors.params.id).toContain('must be an integer');
    });

    it('with 0 id', async () => {
      const res0 = await testServer.delete('/cities/0').send();

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.params.id');
      expect(res0.body.errors.params.id).toContain('must be greater than 0');
    });

    it('with non-existent id', async () => {
      const res0 = await testServer.delete('/cities/999999').send();

      expect(res0.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res0.body).toHaveProperty('errors.default');
    });
  });
});
