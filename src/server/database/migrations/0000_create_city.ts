// !!!

// * 'Migrations' is use to generate/delete DB structure (tables/columns)
// * Note: the files needs to be in sequence (if tableA depends (FK) on tableB, tableB needs to be created first), due to this, is used number in the file name

// ! Note: in prod, if the table is created, dont run 'migration' to update some field. Create a new 'migration' to UPDATE the table
// * This is done to not delete all the table and its data

// Generate migration with knex (use 'npx knex -h' to help), generating the methods 'up' (create) and 'down' (delete)
// Used only to copy-paste structure, but not required
// >npx knex --knexfile KNEX_ENV_FILE_PATH migrate:make test
// It can be added as script
// * Note: when added to script, if 'npm SCRIPT_NAME' is not working, use 'npm run SCRIPT_NAME'

import { Knex } from 'knex';
import { ETableName } from '../ETableNames';

const tableName = ETableName.city;

// ! Note: when some field/table is changed, needs to run rollback command (example below)

// UP method used to create tables/columns
// >npx knex --knexfile KNEX_ENV_FILE_PATH migrate:latest
// When 'database.sqlite' is generated, it can be viewed on VSCode with 'SQLite' extension
export async function up(knex: Knex) {
  return knex.schema.createTable(
    tableName, // Table name
    table => { // Table creation builder
      table.bigIncrements('id').primary().index(); // * index is used to optimize this column for queries (SELECT)
      table.string('name', 150).checkLength('<=', 150).notNullable().index(); // String length is optional (use 'checkLength' to ensure it)
      // In this case, the length is checked here when data is insert into DB and also in API validation
      // For emails/documents, can be used '.unique()'

      // * To use FK pointing to another table: .references('columnNameOfReferencedTable').inTable('tableName').onUpdate('CASCADE').onDelete('RESTRICT');
      // *   Options for 'onUpdate' and 'onDelete' (when referenced table tries to update/delete):
      // *     'CASCADE': applies the same to this table that references the other one
      // *     'RESTRICT': deny the action (delete/update)
      // *     'SET NULL': to set field as 'NULL' , but the field cant be 'notNullable'
      // *     'NO ACTION': do nothing onAction

      table.comment(`Table used to store: ${tableName}`);
    },
  ).then(() => {
    console.log(`# Created table: ${tableName}`); // Simple log after action
  });
}

// DOWN method used to delete tables/columns
// >npx knex --knexfile KNEX_ENV_FILE_PATH migrate:rollback
export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName).then(() => {
    console.log(`# Dropped table: ${tableName}`); // Simple log after action
  });
}
