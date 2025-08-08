import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../../jest.setup';
import { ICityCreate } from '../../../../src/server/database/providers/city/Create';
import { validCity } from '../../../mocks/mocks';

const someCities: string[] = [
  'Manaus',
  'Salvador',
  'Fortaleza',
  'Brasília',
  'Vitória',
  'Goiânia',
  'Belo Horizonte',
  'Belém',
  'Rio de Janeiro',
  'São Paulo',
];

const validCitiesList = (): ICityCreate[] => someCities.map(name => validCity({ name }));

describe('City - GetAll', () => {
  const totalCitiesLength = someCities.length;

  it('ensure total registered cities is >= 10', () => {
    expect(totalCitiesLength).toBeGreaterThanOrEqual(10);
  });

  describe('after creation', () => {
    beforeAll(async () => {
      await Promise.all(validCitiesList().map(city => testServer.post('/cities').send(city)));
    });

    describe('should succeeds', () => {
      it('with some results', async () => {
        const res0 = await testServer.get('/cities').send();

        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(res0.body.length).toBeLessThanOrEqual(totalCitiesLength);
        expect(Number(res0.headers['x-total-count'])).toBeGreaterThanOrEqual(totalCitiesLength);
      });

      it('with filter', async () => {
        const filter = 'o';
        const citiesWithFilterLength = someCities.filter((city) => city.includes(filter)).length;

        const res0 = await testServer.get(`/cities?filter=${filter}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(Number(res0.headers['x-total-count'])).toBeGreaterThanOrEqual(citiesWithFilterLength);
      });

      it('with non-existent filter', async () => {
        const filter = '@abc123@kh dawnd8382d32do2eh f2oofeu2f82hf 28rog42o 242';

        const res0 = await testServer.get(`/cities?filter=${filter}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(res0.body.length).toEqual(0);
        expect(Number(res0.headers['x-total-count'])).toEqual(0);
      });

      it('with limit', async () => {
        const res0 = await testServer.get(`/cities?limit=${totalCitiesLength}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(res0.body.length).toEqual(totalCitiesLength);
        expect(Number(res0.headers['x-total-count'])).toBeGreaterThanOrEqual(totalCitiesLength);
      });

      it('with filter and limit', async () => {
        const filter = 'o';
        const limit = 3;
        const citiesWithFilterLength = someCities.filter((city) => city.includes(filter)).length;

        const res0 = await testServer.get(`/cities?filter=${filter}&limit=${limit}`).send();
        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(res0.body.length).toEqual(limit);
        expect(Number(res0.headers['x-total-count'])).toBeGreaterThanOrEqual(citiesWithFilterLength);
      });

      it('with pagination (page and limit)', async () => {
        const limit = 5;
        const page = 2;
        const res0 = await testServer.get(`/cities?limit=${limit}&page=${page}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(res0.body.length).toEqual(limit);
        expect(Number(res0.headers['x-total-count'])).toBeGreaterThanOrEqual(totalCitiesLength);
      });

      it('with pagination (page and limit), returning empty', async () => {
        const res0 = await testServer.get('/cities?limit=99999&page=99999').send();

        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(res0.body.length).toEqual(0);
        expect(Number(res0.headers['x-total-count'])).toBeGreaterThanOrEqual(0);
      });

      it('with pagination (page and limit) and filter', async () => {
        const filter = 'o';
        const limit = 3;
        const page = 2;
        const citiesWithFilterLength = someCities.filter((city) => city.includes(filter)).length;

        const res0 = await testServer.get(`/cities?filter=${filter}&limit=${limit}&page=${page}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(res0.body.length).toEqual(limit);
        expect(Number(res0.headers['x-total-count'])).toBeGreaterThanOrEqual(citiesWithFilterLength);
      });
    });

    describe('should fail', () => {
      it('with page 0', async () => {
        const page = 0;

        const res0 = await testServer.get(`/cities?page=${page}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res0.body).toHaveProperty('errors.query.page');
        expect(res0.body.errors.query.page).toContain('must be greater than 0');
      });

      it('with limit 0', async () => {
        const limit = 0;

        const res0 = await testServer.get(`/cities?limit=${limit}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res0.body).toHaveProperty('errors.query.limit');
        expect(res0.body.errors.query.limit).toContain('must be greater than 0');
      });

      it('with page less than 0', async () => {
        const page = -1;

        const res0 = await testServer.get(`/cities?page=${page}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res0.body).toHaveProperty('errors.query.page');
        expect(res0.body.errors.query.page).toContain('must be greater than 0');
      });

      it('with limit less than  0', async () => {
        const limit = -1;

        const res0 = await testServer.get(`/cities?limit=${limit}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res0.body).toHaveProperty('errors.query.limit');
        expect(res0.body.errors.query.limit).toContain('must be greater than 0');
      });
    });
  });
});
