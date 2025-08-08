import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../../jest.setup';
import { validCity, validPerson } from '../../../mocks/mocks';

describe('People - GetById', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const response = await testServer.post('/cities').send(validCity());
    cityId = response.body;
  });

  describe('should succeeds', () => {
    it('with valid request', async () => {
      const nameMock = 'test';

      const res0 = await testServer.post('/people').send(validPerson({ cityId: cityId, name: nameMock }));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const res1 = await testServer.get(`/people/${res0.body}`).send();

      expect(res1.statusCode).toEqual(StatusCodes.OK);
      expect(res1.body).toHaveProperty('name');
      expect(res1.body.name).toEqual(nameMock);
    });
  });

  describe('should fail', () => {
    it('with invalid text id', async () => {
      const res0 = await testServer.get('/people/string').send();

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.params.id');
      expect(res0.body.errors.params.id).toContain('must be a `number`');
    });

    it('with decimal id', async () => {
      const res0 = await testServer.get('/people/1.1').send();

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.params.id');
      expect(res0.body.errors.params.id).toContain('must be an integer');
    });

    it('with 0 id', async () => {
      const res0 = await testServer.get('/people/0').send();

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.params.id');
      expect(res0.body.errors.params.id).toContain('must be greater than 0');
    });
    
    it('with non-existent id', async () => {
      const res0 = await testServer.get('/people/999999').send();

      expect(res0.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res0.body).toHaveProperty('errors.default');
    });
  });
});
