import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../../jest.setup';
import { mockTempHeaders, randomEmailGenerator, validCity, validPerson } from '../../../mocks/mocks';

describe('People - UpdateById', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const response = await testServer.post('/cities')
      .set(mockTempHeaders)
      .send(validCity());
    cityId = response.body;
  });

  describe('should succeeds', () => {
    it('with valid request', async () => {
      const res0 = await testServer.post('/people')
        .set(mockTempHeaders)
        .send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const res1 = await testServer.put(`/people/${res0.body}`)
        .set(mockTempHeaders)
        .send(validPerson({ cityId: cityId, name: 'new name' }));

      expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('with a second valid request', async () => {
      const res0 = await testServer.post('/people')
        .set(mockTempHeaders)
        .send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const res1 = await testServer.put(`/people/${res0.body}`)
        .set(mockTempHeaders)
        .send(validPerson({ cityId: cityId, name: 'new name' }));

      expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('with valid request with only name', async () => {
      const res0 = await testServer.post('/people')
        .set(mockTempHeaders)
        .send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const newName = 'new name';
      const res1 = await testServer.put(`/people/${res0.body}`)
        .set(mockTempHeaders)
        .send({ name: newName });

      expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);

      const res2 = await testServer.get(`/people/${res0.body}`)
        .set(mockTempHeaders)
        .send();

      expect(res2.statusCode).toEqual(StatusCodes.OK);
      expect(res2.body).toHaveProperty('name');
      expect(res2.body.name).toEqual(newName);
    });

    it('with valid request with only email', async () => {
      const res0 = await testServer.post('/people')
        .set(mockTempHeaders)
        .send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const newEmail = randomEmailGenerator();
      const res1 = await testServer.put(`/people/${res0.body}`)
        .set(mockTempHeaders)
        .send({ email: newEmail });

      expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);

      const res2 = await testServer.get(`/people/${res0.body}`)
        .set(mockTempHeaders)
        .send();

      expect(res2.statusCode).toEqual(StatusCodes.OK);
      expect(res2.body).toHaveProperty('email');
      expect(res2.body.email).toEqual(newEmail);
    });
  });

  describe('should fail', () => {
    it('with no auth', async () => {
      const res0 = await testServer.post('/people')
        .set(mockTempHeaders)
        .send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const res1 = await testServer.put(`/people/${res0.body}`)
        .send(validPerson({ cityId: cityId, name: 'new name' }));

      expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(res1.body).toHaveProperty('errors.default');
      expect(res1.body.errors.default).toContain('Auth required');
    });

    it('with invalid email', async () => {
      const res0 = await testServer.post('/people')
        .set(mockTempHeaders)
        .send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const res1 = await testServer.put(`/people/${res0.body}`)
        .set(mockTempHeaders)
        .send({ email: 'email' });

      expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res1.body).toHaveProperty('errors.body.email');
      expect(res1.body.errors.body.email).toContain('must be a valid email');
    });

    it('with invalid email even with complete fields', async () => {
      const res0 = await testServer.post('/people')
        .set(mockTempHeaders)
        .send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const res1 = await testServer.put(`/people/${res0.body}`)
        .set(mockTempHeaders)
        .send(validPerson({ cityId, email: 'email' }));

      expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res1.body).toHaveProperty('errors.body.email');
      expect(res1.body.errors.body.email).toContain('must be a valid email');
    });

    it('with invalid name', async () => {
      const res0 = await testServer.post('/people')
        .set(mockTempHeaders)
        .send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const res1 = await testServer.put(`/people/${res0.body}`)
        .set(mockTempHeaders)
        .send({ name: 'na' });

      expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res1.body).toHaveProperty('errors.body.name');
      expect(res1.body.errors.body.name).toContain('>= 3');
    });

    it('with invalid name even with complete fields', async () => {
      const res0 = await testServer.post('/people')
        .set(mockTempHeaders)
        .send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof res0.body).toEqual('number');

      const res1 = await testServer.put(`/people/${res0.body}`)
        .set(mockTempHeaders)
        .send(validPerson({ cityId, name: 'na' }));

      expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res1.body).toHaveProperty('errors.body.name');
      expect(res1.body.errors.body.name).toContain('>= 3');
    });

    it('with invalid text id', async () => {
      const res0 = await testServer.put('/people/string')
        .set(mockTempHeaders)
        .send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.params.id');
      expect(res0.body.errors.params.id).toContain('must be a `number`');
    });

    it('with decimal id', async () => {
      const res0 = await testServer.put('/people/1.1')
        .set(mockTempHeaders)
        .send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.params.id');
      expect(res0.body.errors.params.id).toContain('must be an integer');
    });

    it('with 0 id', async () => {
      const res0 = await testServer.put('/people/0')
        .set(mockTempHeaders)
        .send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.params.id');
      expect(res0.body.errors.params.id).toContain('must be greater than 0');
    });
    
    it('with non-existent id', async () => {
      const res0 = await testServer.put('/people/9999')
        .set(mockTempHeaders)
        .send(validPerson({cityId: cityId}));

      expect(res0.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res0.body).toHaveProperty('errors.default');
    });
  });
});
