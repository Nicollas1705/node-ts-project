// !!!

// * Interface that represents the table in DB. Ensure it has the exact same fields/columns
// ! This will be used in '@types/knex.d.ts' file, dont forget

export interface ICity {
  id: number;
  name: string;
}

// interface ICityCreate extends ICity {} // With the models created, it will be extended
// * BUT, as the ICity needs an ID, that is not used in creation, we can use Omit to ignore this field
export interface ICityCreate extends Omit<ICity, 'id'> {} // As it is ignoring 'id', the validation will not show error when missing 'id'
// * Interface used only to have an easier way to create

export interface ICityUpdate extends Partial<ICityCreate> {} // As it is ignoring 'id', the validation will not show error when missing 'id'
// * Partial: Since 'ICityCreate' has the properties, it would require all fields. But 'Partial' turns all as optional.
