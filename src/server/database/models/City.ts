// !!!

// * Interface that represents the table in DB. Ensure it has the exact same fields/columns
// This will be used in '@types/knex.d.ts' file

export interface ICity {
  id: number;
  name: string;
}
