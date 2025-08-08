import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../../jest.setup';
import { validCity, validPerson } from '../../../mocks/mocks';
import { IPersonCreate } from '../../../../src/server/database/providers/person/Create';

const somePeople: string[] = [
  'James',
  'Jhon',
  'Ana',
  'Josh',
  'Marco',
  'Tonny',
  'Mary',
  'Braian',
  'Donald',
  'Arnold',
];

const validPeopleList = (cityId: number): IPersonCreate[] =>
  somePeople.map(name => validPerson({ name, cityId }));

describe('People - GetAll', () => {
  const totalPeopleLength = somePeople.length;

  it('ensure total registered people is >= 10', () => {
    expect(totalPeopleLength).toBeGreaterThanOrEqual(10);
  });

  describe('after creation', () => {
    let cityId: number | undefined = undefined;
    beforeAll(async () => {
      const response = await testServer.post('/cities').send(validCity());
      cityId = response.body;

      await Promise.all(
        validPeopleList(cityId!).map(person => testServer.post('/people').send(person)),
      );
    });

    describe('should succeeds', () => {
      it('with some results', async () => {
        const res0 = await testServer.get('/people').send();

        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(res0.body.length).toBeLessThanOrEqual(totalPeopleLength);
        expect(Number(res0.headers['x-total-count'])).toBeGreaterThanOrEqual(totalPeopleLength);
      });

      it('with filter', async () => {
        const filter = 'o';
        const peopleWithFilterLength = somePeople.filter((city) => city.includes(filter)).length;

        const res0 = await testServer.get(`/people?filter=${filter}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(Number(res0.headers['x-total-count'])).toBeGreaterThanOrEqual(peopleWithFilterLength);
      });

      it('with non-existent filter', async () => {
        const filter = '@abc123@kh dawnd8382d32do2eh f2oofeu2f82hf 28rog42o 242';

        const res0 = await testServer.get(`/people?filter=${filter}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(res0.body.length).toEqual(0);
        expect(Number(res0.headers['x-total-count'])).toEqual(0);
      });

      it('with limit', async () => {
        const res0 = await testServer.get(`/people?limit=${totalPeopleLength}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(res0.body.length).toEqual(totalPeopleLength);
        expect(Number(res0.headers['x-total-count'])).toBeGreaterThanOrEqual(totalPeopleLength);
      });

      it('with filter and limit', async () => {
        const filter = 'o';
        const limit = 3;
        const peopleWithFilterLength = somePeople.filter((city) => city.includes(filter)).length;

        const res0 = await testServer.get(`/people?filter=${filter}&limit=${limit}`).send();
        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(res0.body.length).toEqual(limit);
        expect(Number(res0.headers['x-total-count'])).toBeGreaterThanOrEqual(peopleWithFilterLength);
      });

      it('with pagination (page and limit)', async () => {
        const limit = 5;
        const page = 2;
        const res0 = await testServer.get(`/people?limit=${limit}&page=${page}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(res0.body.length).toEqual(limit);
        expect(Number(res0.headers['x-total-count'])).toBeGreaterThanOrEqual(totalPeopleLength);
      });

      it('with pagination (page and limit), returning empty', async () => {
        const res0 = await testServer.get('/people?limit=99999&page=99999').send();

        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(res0.body.length).toEqual(0);
        expect(Number(res0.headers['x-total-count'])).toBeGreaterThanOrEqual(0);
      });

      it('with pagination (page and limit) and filter', async () => {
        const filter = 'o';
        const limit = 3;
        const page = 2;
        const peopleWithFilterLength = somePeople.filter((city) => city.includes(filter)).length;

        const res0 = await testServer.get(`/people?filter=${filter}&limit=${limit}&page=${page}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.OK);
        expect(res0.body.length).toEqual(limit);
        expect(Number(res0.headers['x-total-count'])).toBeGreaterThanOrEqual(peopleWithFilterLength);
      });
    });

    describe('should fail', () => {
      it('with page 0', async () => {
        const page = 0;

        const res0 = await testServer.get(`/people?page=${page}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res0.body).toHaveProperty('errors.query.page');
        expect(res0.body.errors.query.page).toContain('must be greater than 0');
      });

      it('with limit 0', async () => {
        const limit = 0;

        const res0 = await testServer.get(`/people?limit=${limit}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res0.body).toHaveProperty('errors.query.limit');
        expect(res0.body.errors.query.limit).toContain('must be greater than 0');
      });

      it('with page less than 0', async () => {
        const page = -1;

        const res0 = await testServer.get(`/people?page=${page}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res0.body).toHaveProperty('errors.query.page');
        expect(res0.body.errors.query.page).toContain('must be greater than 0');
      });

      it('with limit less than  0', async () => {
        const limit = -1;

        const res0 = await testServer.get(`/people?limit=${limit}`).send();

        expect(res0.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res0.body).toHaveProperty('errors.query.limit');
        expect(res0.body.errors.query.limit).toContain('must be greater than 0');
      });
    });
  });
});
