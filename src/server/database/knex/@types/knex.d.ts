// !!!

// * Types definition file for TS (*.d.ts)

import { ICity, IPerson, IUser } from '../../models';

declare module 'knex/types/tables' {
  interface Tables { // Easier way to access table in controller: 
    // ! Note: if the interface is not imported here, it wont get error, but all the types will be 'any' instead of the interface set
    city: ICity, // Remember to import it from the right place
    person: IPerson,
    user: IUser,
  }
  // * The interface can also be defined here, like:
  // interface ICity {
  //   id: number;
  //   name: string;
  // }
}
