import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../../jest.setup';
import { randomEmailGenerator, randomPasswordGenerator, validUser } from '../../../mocks/mocks';
import { IUserCreate } from '../../../../src/server/database/providers/user/Create';

describe('User - SignIn', () => {
  let user: IUserCreate | undefined = undefined;
  beforeAll(async () => {
    user = validUser();

    await testServer.post('/register').send(user);
  });

  describe('should succeeds', () => {
    it('with valid request', async () => {
      const res0 = await testServer.post('/sign-in').send(user);

      expect(res0.statusCode).toEqual(StatusCodes.OK);
      expect(res0.body).toHaveProperty('accessToken');
    });

    it('with duplicated valid request', async () => {
      const res0 = await testServer.post('/sign-in').send(user);

      expect(res0.statusCode).toEqual(StatusCodes.OK);
      expect(res0.body).toHaveProperty('accessToken');
    });
  });

  describe('should fail', () => {
    it('with invalid request', async () => {
      const res0 = await testServer.post('/sign-in').send({ 'id': 0 });

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.email');
      expect(res0.body).toHaveProperty('errors.body.password');
      expect(res0.body.errors.body.email).toContain('required');
      expect(res0.body.errors.body.password).toContain('required');
    });

    it('with wrong password', async () => {
      const res0 = await testServer.post('/sign-in')
        .send({ email: user!.email, password: randomPasswordGenerator() });

      expect(res0.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(res0.body).toHaveProperty('errors.default');
      expect(res0.body.errors.default).toContain('Invalid login');
    });

    it('with short password', async () => {
      const res0 = await testServer.post('/sign-in')
        .send({ email: user!.email, password: '0' });

      expect(res0.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(res0.body).toHaveProperty('errors.default');
      expect(res0.body.errors.default).toContain('Invalid login');
    });

    it('with no password', async () => {
      const res0 = await testServer.post('/sign-in')
        .send({ email: user!.email });

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.password');
      expect(res0.body.errors.body.password).toContain('required');
    });

    it('with wrong email', async () => {
      const res0 = await testServer.post('/sign-in')
        .send({ email: randomEmailGenerator(), password: user!.password });

      expect(res0.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
      expect(res0.body).toHaveProperty('errors.default');
      expect(res0.body.errors.default).toContain('Invalid login');
    });

    it('with invalid email', async () => {
      const res0 = await testServer.post('/sign-in')
        .send({ email: 'email', password: user!.password });

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.email');
      expect(res0.body.errors.body.email).toContain('must be a valid email');
    });

    it('with no email', async () => {
      const res0 = await testServer.post('/sign-in')
        .send({ password: user!.password });

      expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res0.body).toHaveProperty('errors.body.email');
      expect(res0.body.errors.body.email).toContain('required');
    });
  });
});
