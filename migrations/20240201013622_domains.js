/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('domains', table => {
    table.increments('id').primary();
    table.string('base_url', 255).notNullable();
    table.string('not_found_redirect', 255);
    table.string('invalid_url_redirect', 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('domains');
};
