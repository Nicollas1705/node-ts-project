import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../../jest.setup';
import { randomEmailGenerator, randomPasswordGenerator, validUser } from '../../../mocks/mocks';

describe('User - Register', () => {
  describe('should succeeds', () => {
    it('with valid request', async () => {
      const res0 = await testServer
        .post('/register')
        .send(validUser());

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
    });

    it('with a seconds valid request', async () => {
      const res0 = await testServer
        .post('/register')
        .send(validUser());

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);
    });

    it('with duplicated password in valid request', async () => {
      const password = randomPasswordGenerator();
      const res0 = await testServer.post('/register').send(validUser({ password }));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);

      const res1 = await testServer.post('/register').send(validUser({ password }));

      expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    });
  });

  describe('should fail', () => {
    it('with duplicated email in valid request', async () => {
      const email = randomEmailGenerator();
      const res0 = await testServer.post('/register').send(validUser({ email }));

      expect(res0.statusCode).toEqual(StatusCodes.CREATED);

      const res1 = await testServer.post('/register').send(validUser({ email }));

      expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(res1.body).toHaveProperty('errors.default');
    });

    it('with short name', async () => {
      const res0 = await testServer
        .post('/register')
        .send(validUser({ name: 'AA' }));

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.name');
      expect(res0.body.errors.body.name).toContain('>= 3');
    });

    it('with no name', async () => {
      const res0 = await testServer
        .post('/register')
        .send({ email: randomEmailGenerator(), password: randomPasswordGenerator() });

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.name');
      expect(res0.body.errors.body.name).toContain('required');
    });

    it('with short password', async () => {
      const res0 = await testServer
        .post('/register')
        .send(validUser({ password: '12345' }));

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.password');
      expect(res0.body.errors.body.password).toContain('>= 6');
    });

    it('with no password', async () => {
      const res0 = await testServer
        .post('/register')
        .send({ email: randomEmailGenerator(), name: 'name' }); // TODO: testar se dá pra usar o validUser com password '', se der certo, fazer em outros lugares onde testa sem algum campo

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.password');
      expect(res0.body.errors.body.password).toContain('required');
    });

    it('with no email', async () => {
      const res0 = await testServer
        .post('/register')
        .send({ name: 'name', password: randomPasswordGenerator() });

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.email');
      expect(res0.body.errors.body.email).toContain('required');
    });

    it('with invalid email', async () => {
      const res0 = await testServer
        .post('/register')
        .send(validUser({ email: 'email' }));

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.email');
      expect(res0.body.errors.body.email).toContain('must be a valid email');
    });

    it('with invalid body', async () => {
      const res0 = await testServer
        .post('/register')
        .send({ 'id': 0 });

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.name');
      expect(res0.body).toHaveProperty('errors.body.email');
      expect(res0.body).toHaveProperty('errors.body.password');
      expect(res0.body.errors.body.name).toContain('required');
      expect(res0.body.errors.body.email).toContain('required');
      expect(res0.body.errors.body.password).toContain('required');
    });
  });
});
