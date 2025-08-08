import { Knex } from 'knex';
import { ETableName } from '../ETableNames';
import { devLog } from '../../utils/utils';

const tableName = ETableName.person;

export async function up(knex: Knex) {
  return knex.schema.createTable(
    tableName,
    table => {
      table.bigIncrements('id').primary().index();
      table.string('name', 150).checkLength('<=', 150).notNullable().index();
      table.string('email', 150).unique().checkLength('<=', 150).notNullable(); // * Unique email
      table.bigInteger('cityId')
        .notNullable()
        .index()
        .references('id')
        .inTable(ETableName.city)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table.comment(`Table used to store: ${tableName}`);
    },
  ).then(() => {
    devLog(`# Created table: ${tableName}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName).then(() => {
    devLog(`# Dropped table: ${tableName}`);
  });
}
