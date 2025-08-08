// !!!

import { IUser } from '../../src/server/database/models';
import { ICityCreate } from '../../src/server/database/providers/city/Create';
import { ICityUpdate } from '../../src/server/database/providers/city/UpdateById';
import { IPersonCreate } from '../../src/server/database/providers/person/Create';
import { IPersonUpdate } from '../../src/server/database/providers/person/UpdateById';
import { IUserCreate } from '../../src/server/database/providers/user/Create';

// * Random integer generator
function randomInt(min: number = 0, max: number = 999999): number {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil);
}

export const randomEmailGenerator = () => `email${randomInt()}${randomInt()}@email.com`;

// * This is a way to have default values on return, but all of them can be overriden in 'person' param
export const validPerson = (person?: IPersonUpdate): IPersonCreate => ({
  'name': 'Name',
  'email': randomEmailGenerator(),
  'cityId': 0,
  ...person,
});

export const validCity = (city?: ICityUpdate): ICityCreate => ({
  'name': 'City',
  ...city,
});

export const randomPasswordGenerator = () => `${randomInt()}${randomInt()}`;

export const validUser = (user?: Partial<Omit<IUser, 'id'>>): IUserCreate => ({
  'name': 'User',
  'email': randomEmailGenerator(),
  'password': randomPasswordGenerator(),
  ...user,
});
