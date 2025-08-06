import { Knex } from 'knex';
import { ETableName } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(
    ETableName.person,
    table => {
      table.bigIncrements('id').primary().index();
      table.string('name', 150).checkLength('<=', 150).notNullable().index();
      table.string('email', 150).unique().checkLength('<=', 150).notNullable(); // * Unique email
      table.bigInteger('cityId').notNullable().index().references('id').inTable(ETableName.city).onUpdate('CASCADE').onDelete('RESTRICT');
      table.comment('Table used to store people');
    },
  ).then(() => {
    console.log(`# Created table: ${ETableName.person}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableName.person).then(() => {
    console.log(`# Dropped table: ${ETableName.person}`);
  });
}
