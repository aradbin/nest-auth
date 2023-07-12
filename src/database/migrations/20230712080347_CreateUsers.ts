import { Knex } from "knex";

const tableName = 'users';

export async function up(knex: Knex) {
    return knex.schema.createTable(tableName, table => {
      table.increments();
      table.string('name').nullable();
      table.string('email').notNullable();
      table.string('password').nullable();
      table.dateTime('created_at').nullable();
      table.integer('created_by').nullable();
      table.dateTime('updated_at').nullable();
      table.integer('updated_by').nullable();
      table.dateTime('deleted_at').nullable();
      table.integer('deleted_by').nullable();
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}