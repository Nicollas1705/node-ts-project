// !!!

import { ICity, IPerson } from "../../src/server/database/models";

// * Random integer generator
function randomInt(min: number = 0, max: number = 999999): number {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil);
}

export const randomEmailGenerator = () => `email${randomInt()}${randomInt()}@email.com`;

// * This is a way to have default values on return, but all of them can be overriden in 'person' param
export const validPerson = (person?: Partial<Omit<IPerson, 'id'>>): Omit<IPerson, 'id'> => ({
  'name': 'City',
  'email': randomEmailGenerator(),
  'cityId': 0,
  ...person,
});

export const validCity = (): Omit<ICity, 'id'> => ({
  'name': 'City',
});
