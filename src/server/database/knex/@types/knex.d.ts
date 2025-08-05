// !!!

// Types definition file for TS (*.d.ts)

import { ICity } from '../../models';

declare module 'knex/types/tables' {
  interface Tables { // Easier way to access table in controller: 
    city: ICity, // Remember to import it from the right place
  }
  // * The interface can also be defined here, like:
  // interface ICity {
  //   id: number;
  //   name: string;
  // }
}
