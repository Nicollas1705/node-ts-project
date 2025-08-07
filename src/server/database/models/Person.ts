export interface IPerson {
  id: number;
  name: string;
  email: string;
  cityId: number; // * The FK pointing to city
}
