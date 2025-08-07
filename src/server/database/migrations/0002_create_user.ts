import { Knex } from 'knex';
import { ETableName } from '../ETableNames';

const tableName = ETableName.user;

export async function up(knex: Knex) {
  return knex.schema.createTable(
    tableName,
    table => {
      table.bigIncrements('id').primary().index();
      table.string('name', 150).checkLength('<=', 150).checkLength('>=', 3).notNullable().index();
      table.string('email', 150).index().unique().checkLength('<=', 150).checkLength('>=', 5).notNullable();
      table.string('password').checkLength('>=', 6).notNullable();
      table.comment(`Table used to store: ${tableName}`);
    },
  ).then(() => {
    console.log(`# Created table: ${tableName}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName).then(() => {
    console.log(`# Dropped table: ${tableName}`);
  });
}
