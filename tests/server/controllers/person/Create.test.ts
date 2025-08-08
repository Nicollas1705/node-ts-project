// !!!

import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../../jest.setup';
import { randomEmailGenerator, validCity, validPerson } from '../../../mocks/mocks';

describe('Person - Create', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const response = await testServer.post('/cities').send(validCity());
    cityId = response.body;
  });

  describe('should succeeds', () => {
    it('with valid request', async () => {
      const res0 = await testServer
        .post('/people')
        .send(validPerson({ cityId })); // ! In this case, { cityId: cityId } is the same as { cityId }

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');
    });

    it('with a seconds valid request', async () => {
      const res0 = await testServer
        .post('/people')
        .send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');
    });
  });

  describe('should fail', () => {
    it('with duplicated email in valid request', async () => {
      const email = randomEmailGenerator();
      const res0 = await testServer.post('/people').send(validPerson({ cityId, email }));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const res1 = await testServer.post('/people').send(validPerson({ cityId, email }));

      expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res1.body).toHaveProperty('errors.default');
    });

    it('with short name', async () => {
      const res0 = await testServer
        .post('/people')
        .send(validPerson({ cityId, name: 'AA' }));

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.name');
      expect(res0.body.errors.body.name).toContain('>= 3');
    });

    it('with no name', async () => {
      const res0 = await testServer
        .post('/people')
        .send(validPerson({ cityId, name: undefined }));

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.name');
      expect(res0.body.errors.body.name).toContain('required');
    });

    it('with no email', async () => {
      const res0 = await testServer
        .post('/people')
        .send(validPerson({ cityId, email: undefined }));

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.email');
      expect(res0.body.errors.body.email).toContain('required');
    });

    it('with invalid email', async () => {
      const res0 = await testServer
        .post('/people')
        .send(validPerson({ cityId, email: 'email' }));

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.email');
      expect(res0.body.errors.body.email).toContain('must be a valid email');
    });

    it('with no cityId', async () => {
      const res0 = await testServer
        .post('/people')
        .send(validPerson({ cityId: undefined }));

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.cityId');
      expect(res0.body.errors.body.cityId).toContain('required');
    });

    it('with invalid cityId', async () => {
      const res0 = await testServer
        .post('/people')
        .send({ name: 'name', email: randomEmailGenerator(), cityId: 'test' });

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.cityId');
      expect(res0.body.errors.body.cityId).toContain('must be a `number`');
    });

    it('with non-existent cityId', async () => {
      const res0 = await testServer
        .post('/people')
        .send(validPerson({ cityId: 999999 }));

      expect(res0.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res0.body).toHaveProperty('errors.default');
    });

    it('with invalid body', async () => {
      const res0 = await testServer
        .post('/people')
        .send({ 'id': 0 });

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.name');
      expect(res0.body).toHaveProperty('errors.body.email');
      expect(res0.body).toHaveProperty('errors.body.cityId');
      expect(res0.body.errors.body.name).toContain('required');
      expect(res0.body.errors.body.email).toContain('required');
      expect(res0.body.errors.body.cityId).toContain('required');
    });
  });
});
