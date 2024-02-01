/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('api_keys', function(table) {
    table.increments('id').primary();
    table.string('key', 255);
    table.string('description', 1024);
    table.timestamp('expiration_date');
    table.smallint('enabled').defaultTo(1);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('api_keys');
};
